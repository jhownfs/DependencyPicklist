# Dependency Picklist ![image](https://img.shields.io/badge/Salesforce-00A1E0?style=for-the-badge&logo=Salesforce&logoColor=white)


This component can be used to do a Dependency Picklist from custom metadata.

## 💻 How I to use?

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

## USE CASE

Sometimes we need to customize standard dependency picklist Salesforce to use custom logic for some reasons, standard picklist values limit, standard dependency limit, or more...So I created this component to solve this problem, using custom LWC and Custom metadata.

You can modify and adjust according to your needs.


## HOW THIS COMPONENT WORKS

You can use this component inside any object, but it's important this object has field that contain the same name, to insert values selected.
![alt text](image.png)

Component reads informations about dependency picklist from Custom metadata that has the same name.
![alt text](image-1.png)

Labels inside component come from Custom Labels Salesforce.
![alt text](image-2.png)


## Next Updates 🚀

[x] Add prints in readME to explain more about component works

[] Apply Some Design patterns to standardized to back and front (We have code smells here)

[] Dynamic picklist values and dependency (Consider another object structure)

## Find some bug or want to help, please open a PR 🚩

## Licença 📝

This project is under license. Se the file [License](LICENSE) for more details.

[⬆ Voltar ao topo](https://github.com/jhownfs/GlobalsearchLWC.git)<br>
