import { LightningElement, track, wire, api } from 'lwc';
import getPicklistValues from '@salesforce/apex/DependencyPicklistController.getPicklistValues';
import saveRecord from '@salesforce/apex/DependencyPicklistController.saveRecord';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';

export default class DependencyPicklist extends LightningElement {

  @api recordId;

  recordtypeValueSelected;
  subtypeValueSelected;
  toolPicklistValueSelected;
  typePicklistValueSelected;

  mapRecordtypePicklist = new Map();
  mapSubtypePicklist = new Map();
  mapToolPicklist = new Map();

  @track subtypeDisabled = false;
  @track toolDisabled = false;
  @track typeDisabled = false;
  @track recordtypePicklist = [];
  @track subtypePicklist = [];
  @track toolPicklist = [];
  @track typePicklist = [];
  @track isLoading = false;
  connectedCallback(){
    this.subtypeDisabled = true;
    this.toolDisabled = true;
    this.typeDisabled = true;
    this.isLoading = true;
  }

  removeDuplicates(data){

    return data.filter((element, index, self) => 
      index === self.findIndex((v) => v.value === element.value)
      );
  }

  @wire(getPicklistValues)
    wirepicklist( { error, data } ){
      let RecordtypeAux = [];
      if(data){

        data.forEach(element => {
          
          //level 1
          let listAux = [];
          let key = element.Recordtype__c;

          listAux = this.mapRecordtypePicklist.get(key);
          if(listAux === undefined){
            listAux = [];
          }
          listAux.push({value: element.SubType__c, label: element.SubType__c});
          this.mapRecordtypePicklist.set(key, listAux);

          //level 2
          key = element.Recordtype__c + '-'+ element.SubType__c;
          listAux = this.mapSubtypePicklist.get(key);
          if(listAux === undefined){
            listAux = [];
          }
          listAux.push({value: element.Tool__c, label: element.Tool__c});
          this.mapSubtypePicklist.set(key, listAux);
 
          //level 3  
          key = element.Recordtype__c + '-'+ element.SubType__c + '-' + element.Tool__c;
          listAux = this.mapToolPicklist.get(key);
          if(listAux === undefined){
            listAux = [];
          }
          listAux.push({value: element.Type__c, label: element.Type__c});
          this.mapToolPicklist.set(key, listAux);

          RecordtypeAux.push({value: element.Recordtype__c, label: element.Recordtype__c});
        });

        this.recordtypePicklist = this.removeDuplicates(RecordtypeAux);
        this.isLoading = false;

      } else if(error) {
        console.log('error =', error);
        this.isLoading = false;
      }
  }
  
  
  handleRecordTypeChange(event){
    this.recordtypeValueSelected = event.detail.value;
    let listAux = this.mapRecordtypePicklist.get(this.recordtypeValueSelected);

    this.subtypePicklist = this.removeDuplicates(listAux);
    this.toolPicklist = [];
    this.typePicklist = [];
    this.subtypeDisabled = false;
    this.toolDisabled = true;
    this.typeDisabled = true;
  }

  handleSubTypeChange(event){
    let key = this.recordtypeValueSelected + '-'+event.detail.value;
    this.subtypeValueSelected = event.detail.value;
    let listAux = this.mapSubtypePicklist.get(key);

    this.toolPicklist = this.removeDuplicates(listAux);
    this.toolDisabled = false;
    this.typeDisabled = true;
  }

  handleToolChange(event){
    let key = this.recordtypeValueSelected + '-'+ this.subtypeValueSelected + '-'+ event.detail.value;
    this.toolPicklistValueSelected = event.detail.value;
    let listAux = this.mapToolPicklist.get(key);

    this.typePicklist = this.removeDuplicates(listAux);
    this.typeDisabled = false;
  }

  handleTypeChange(event){
    this.typePicklistValueSelected = event.detail.value;
  }

  handleSave(){
    this.isLoading = true;
    let picklistValues = {
      recordtype: this.recordtypeValueSelected,
      subtype: this.subtypeValueSelected,
      tool: this.toolPicklistValueSelected,
      type: this.typePicklistValueSelected
    }

    saveRecord({ recordId: this.recordId, wrapperValues: JSON.stringify(picklistValues)})
    .then(data => {
      this.showAlertToast('Record Update', 'Record has been updated!', 'success');
      this.handler();
      this.isLoading = false;
    }).catch(error => {
      console.log('error = '+ error);
      this.showAlertToast('Error', error, 'error');
      this.isLoading = false;
    });
  }

  handleReset(){
    this.subtypePicklist = [];
    this.toolPicklist = [];
    this.typePicklist = [];

    this.toolDisabled = true;
    this.typeDisabled = true;
  }


  showAlertToast(title, message, type){
    
    const event =  new ShowToastEvent({
      title: title,
      message: message,
      variant: type

    });

    this.dispatchEvent(event);

  }

  async handler() {
    await notifyRecordUpdateAvailable([{recordId: this.recordId}]);
  }
}