public with sharing class DependencyPicklistController {


 @AuraEnabled(cacheable=true)
 public static list<DependencyPicklist__mdt> getPicklistValues(){

    list<DependencyPicklist__mdt> lstDp = new list<DependencyPicklist__mdt>();
    
    try {
      
      lstDp = DependencyPicklistSelector.getDependecyPicklistAllValues();
   
    } catch (Exception e) {
        throw new AuraHandledException(JSON.serialize(e.getMessage()));
    }

    return lstDp;
 }
}