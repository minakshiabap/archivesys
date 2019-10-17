sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	'sap/m/MessagePopover',
	'sap/m/MessageItem'
], function(jQuery, Controller, History, JSONModel, MessageBox, MessagePopover, MessageItem) {
	"use strict";
	var oTargetField;
	var oSDCField;
	var oUsernameField;
	var oSystemField;
	var oClientField;
	return Controller.extend("oft.fiori.controller.BaseController", {
		/**
		 * Global Variables used in all controllers
		 * Defining the formatters here allows the use in all controllers that extends the base controller
		 * Also defined the models here so that all controllers would be able to access them
		 *
		 */
		secureToken: "",
		currentUser: "",
		bUserTestcases: true,
		oEventBus: undefined,
		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		onInit: function() {

		},
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},
		getCurrentUser: function(){
			return this.currentUser;
		}

	});
});
