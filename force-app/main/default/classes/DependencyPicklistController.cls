public with sharing class DependencyPicklistController {


 @AuraEnabled(cacheable=true)
 public static list<DependencyPicklist__mdt> getPicklistValues(){

    list<DependencyPicklist__mdt> lstDp = new list<DependencyPicklist__mdt>();
    
    try {
        
      lstDp = [SELECT id, Recordtype__c, SubType__c, Tool__c, Type__c FROM DependencyPicklist__mdt];
   
    } catch (Exception e) {
        throw new AuraHandledException(JSON.serialize(e.getMessage()));
    }

    return lstDp;
 }
}