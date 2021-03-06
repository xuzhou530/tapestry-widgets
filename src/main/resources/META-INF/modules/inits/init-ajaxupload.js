(function(){
	define(["t5/core/dom", "t5/core/events","t5/core/pageinit","t5/core/zone","plugin/json","plugin/fileupload","plugin/adialog","jquery"],function(dom,events,pageinit,zone,json,fileupload,medialog,$){
		var fileupload;
		
		ajaxupload = function(spec){
			var el = $('#' + spec.elementId),
	        options = {
	            showMessage : function(message) {
	            	var dialogOpts = {
	            		title:spec.messages.tipLabel,
        			    content: message,
        				id:'aid'+spec.elementId,
        				padding: '20px',
        				lock: true
        			}
        			art.dialog(dialogOpts);
	            },
	
	            onComplete : function(id, fileName, responseJSON) {
	
	                if (responseJSON._tapestry && responseJSON._tapestry.content) {
	
	                    pageinit.handlePartialPageRenderResponse({
	                        json : responseJSON
	                    }, function(response) {
	
	                    });
	                };
	                
	                if (responseJSON.updateZone) {
	                	var spec = {
								url : responseJSON.updateZone.url,
								params : responseJSON.updateZone.params
							};
	
	                		var zoneId = responseJSON.updateZone.zoneId;
	                		if(!zoneId){
	                			return;
	                		}
							zone.deferredZoneUpdate(zoneId,spec.url);
	                }
	            },
	
				template : '<div class="qq-uploader">'
						+ '<div class="qq-upload-drop-area btn-hide"><span>'
						+ spec.messages.dropAreaLabel
						+ ' </span></div>'
						+ '<a class="qq-upload-button '+spec.cls+'">'
						+ '<i class="'+spec.itemcls+'"></i>'
						+ spec.messages.uploadLabel + '</a>'
						+ '<ul class="qq-upload-list btn-hide"></ul>' + '</div>',
	
				// 文件列表
				fileTemplate : '<li>'
						+ '<span class="qq-upload-file"></span>'
						+ '<span class="qq-upload-spinner"></span>'
						+ '<span class="qq-upload-size"></span>'
						+ '<a class="qq-upload-cancel" href="#">'
						+ spec.messages.cancelLabel + ' </a>'
						+ '<span class="qq-upload-failed-text">'
						+ spec.messages.failedLabel + '</span>'
						+ '</li>'
			};
	
			$.extend(options, spec);
			el.fileuploader(options);
		}
		return{
			ajaxupload:ajaxupload
		}
	});
}).call(this);