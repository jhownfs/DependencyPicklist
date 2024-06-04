public with sharing class DependencyPicklistSelector {
   
    public static list<DependencyPicklist__mdt> getDependecyPicklistAllValues(){
      return [SELECT id, Recordtype__c, SubType__c, Tool__c, Type__c FROM DependencyPicklist__mdt];
    }
}