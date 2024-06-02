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

 @AuraEnabled
 public static String saveRecord(String recordId, String wrapperValues){

  String msgResult;

  try {
    
    wrapperFields Fields = (wrapperFields) JSON.deserializeStrict(wrapperValues, wrapperFields.class);
    system.debug('Fields =' + Fields);

    system.debug('recordId =' + recordId);
    Case caseUpsert = new Case(id = recordId);
    caseUpsert.Recordtype__c = Fields.recordtype;
    caseUpsert.SubType__c = Fields.subtype;
    caseUpsert.Tool__c = Fields.tool;
    caseUpsert.Type__c = Fields.type;
    system.debug('caseUpsert =' + caseUpsert);
    upsert caseUpsert;
    msgResult = 'success';
  } catch (Exception e) {
    throw new AuraHandledException(e.getMessage());
  }

  return msgResult;

 }

 public class wrapperFields{
   public String recordtype;
   public String subtype;
   public String tool;
   public String type;
 }
}