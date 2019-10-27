sap.ui.define([
	"oft/fiori/controller/BaseController",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("oft.fiori.controller.App", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf oft.fiori.view.App
		 */
		 idleLogout: function() {
			 var t;
			 var that = this;
			 window.onbeforeunload = function() {
        that.logOutApp("X");
			 };

			 window.onload = resetTimer;
			 window.onmousemove = resetTimer;
			 window.onmousedown = resetTimer;  // catches touchscreen presses as well
			 window.ontouchstart = resetTimer; // catches touchscreen swipes as well
			 window.onclick = resetTimer;      // catches touchpad clicks as well
			 window.onkeypress = resetTimer;
			 window.addEventListener('scroll', resetTimer, true); // improved; see comments

			 function yourFunction() {
					 // your function for too long inactivity goes here
					 // e.g. window.location.href = 'logout.php';
					 sap.m.MessageBox.alert("Page expired, please login again!");
					 window.top.location.href = "/";
			 }

			 function resetTimer() {
					 clearTimeout(t);
					 t = setTimeout(yourFunction, 900000);  // time is in milliseconds
			 }
		 },
		 onFinish: function(onFinish){
			 for (var i = 0; i < onFinish.getSource().getItems().length; i++) {
				 var name = this.allRoles[onFinish.getSource().getItems()[i].getCells()[0].getText()].name;
  			 onFinish.getSource().getItems()[i].getCells()[0].setText(name);
			 }
		 },
		 allRoles: [],
		 onSearch: function(oEvent){
			 //step 1: read what use enetered in field
			 var userName = oEvent.getParameter("value");
			 //step 2: read the technical user id - pk
			 var oDataModel = this.getView().getModel();
			 var that = this;
			 oDataModel.read("/roles",{
				 success: function(dataSet){
					 for (var i = 0; i < dataSet.results.length; i++) {
					 	that.allRoles[dataSet.results[i].id] = {
							name: dataSet.results[i].role
						};
					 }
				 }
			 });
			 $.get("/getSpecial", function(res){
				 console.log(res);
			 });
			 oDataModel.read("/AppUsers",{
				 filters: [new sap.ui.model.Filter("userId", sap.ui.model.FilterOperator.EQ , userName)],
				 success: function(resultsx){
					 //alert("yeah found this user");
					 var userId = "'" + resultsx.results[0].id + "'";
					 var that2 = that;
					 oDataModel.read("/userRoles",{
						 filters: [new sap.ui.model.Filter("UserId", sap.ui.model.FilterOperator.EQ , userId)],
						 success: function(results){
							 var oTable = that2.getView().byId("idRoles");
							 var oModel = new sap.ui.model.json.JSONModel();
							 oModel.setData({data: results.results});
							 oTable.setModel(oModel);
							 oTable.bindItems({
								 path: "/data",
								 template: new sap.m.ColumnListItem({
									 cells: [new sap.m.Text({text: "{RoleId}"}),
								 					new sap.m.Text({text: "{__v}"})]
								 })
							 });
						 }
					 });

				 }
			 });

			 //step 3: get the corresponding user's Role
			 //step 4: fill my table

		 },
		 onLogout: function(){
			 this.logOutApp();
		 },
			onInit: function() {
				this.getOwnerComponent().getModel("local").setSizeLimit(600);
				this.idleLogout();

			},
			onLoadData: function(){
				//step1 : obtain the object of our odata Models
				var oDataModel = this.getView().getModel();
				//step 2: use the model object to make an odata get call to read one ES - AppUsers
				oDataModel.read("/AppUsers", {
					success: function(data){
						debugger;
					},
					error: function(error){

					}
				});
			},
			onSave: function(){
				var payload = {
													"userId": this.getView().byId("idUserId").getValue(),
											    "userName": this.getView().byId("idUserName").getValue(),
											    "firstName":this.getView().byId("idFirstName").getValue(),
											    "lastName":this.getView().byId("idLastName").getValue()
											};
				var oDataModel = this.getView().getModel();
				oDataModel.create("/AppUsers", payload, {
					success: function(response){
						MessageToast.show("Save was successful");
					},
					error: function(){
						debugger;
					}
				})

			}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf oft.fiori.view.App
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf oft.fiori.view.App
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf oft.fiori.view.App
		 */
		//	onExit: function() {
		//
		//	}

	});

});
