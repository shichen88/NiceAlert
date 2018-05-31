var NiceAlert = {};

NiceAlert.success = function(message, closeCallback) {
    _niceAlertCreate({
        dialogSelectorClass: "js-nice-alert-success-tpl",
        titleFontColor: "#5cb85c",
        titleIconClass: "glyphicon glyphicon-ok",
        titleLabel: "成功",
        okBtnClass: "btn-success",
        messageContent: message,
        closeCallback: closeCallback,
        successFlag: true
    })
};

NiceAlert.info = function(message, closeCallback) {
    _niceAlertCreate({
        dialogSelectorClass: "js-nice-alert-info-tpl",
        titleFontColor: "#5bc0de",
        titleIconClass: "glyphicon glyphicon-info-sign",
        titleLabel: "信息",
        okBtnClass: "btn-info",
        messageContent: message,
        closeCallback: closeCallback
    })
};

NiceAlert.warning = function(message, closeCallback) {
    _niceAlertCreate({
        dialogSelectorClass: "js-nice-alert-warning-tpl",
        titleFontColor: "#f0ad4e",
        titleIconClass: "glyphicon glyphicon-exclamation-sign",
        titleLabel: "警告",
        okBtnClass: "btn-warning",
        messageContent: message,
        closeCallback: closeCallback
    })
};

NiceAlert.error = function(message, closeCallback) {
    _niceAlertCreate({
        dialogSelectorClass: "js-nice-alert-error-tpl",
        titleFontColor: "#d9534f",
        titleIconClass: "glyphicon glyphicon-remove-sign",
        titleLabel: "错误",
        okBtnClass: "btn-danger",
        messageContent: message,
        closeCallback: closeCallback
    })
};

NiceAlert.confirm = function(message, okCallback, cancelCallback) {
    _niceAlertCreate({
        dialogSelectorClass: "js-nice-alert-confirm-tpl",
        titleFontColor: "#337ab7",
        titleIconClass: "glyphicon glyphicon-question-sign",
        titleLabel: "确认",
        okBtnClass: "btn-primary",
        cancelBtnClass: "btn-default",
        messageContent: message,
        confirmFlag: true,
        okCallback: okCallback,
        cancelCallback: cancelCallback
    })
};

var _niceAlertCreate = function(initObj) {
    var dialogSelectorClass = initObj.dialogSelectorClass;
    var titleFontColor = initObj.titleFontColor;
    var titleIconClass = initObj.titleIconClass;
    var titleLabel = initObj.titleLabel;
    var messageContent = initObj.messageContent;
    var okBtnClass = initObj.okBtnClass;
    var okBtnLabel = initObj.okBtnLabel || "确定";
    var closeCallback = initObj.closeCallback;

    // 是否是success弹框，默认为false
    var successFlag = initObj.successFlag || false;
    // 是否是confirm弹框，默认为false
    var confirmFlag = initObj.confirmFlag || false;

    // 以下属性只有在confirmFlag为true的时候才有效
    var cancelBtnClass = initObj.cancelBtnClass;
    var cancelBtnLabel = initObj.cancelBtnLabel || "取消";
    var okCallback = initObj.okCallback;
    var cancelCallback = initObj.cancelCallback;

    var _formatedNiceAlertTpl = _niceAlertTemplate
        .replace("{dialogSelectorClass}", dialogSelectorClass)
        .replace("{titleFontColor}", titleFontColor)
        .replace("{titleIconClass}", titleIconClass)
        .replace("{titleLabel}", titleLabel)
        .replace("{messageContent}", messageContent)
        .replace("{okBtnClass}", okBtnClass)
        .replace("{okBtnLabel}", okBtnLabel);

    if ($("body").find("." + dialogSelectorClass).length == 0) {
        $("body").append(_formatedNiceAlertTpl);
        // confirm弹框相关处理
        if (confirmFlag) {
            // 添加"取消"按钮
            $("." + dialogSelectorClass).find(".modal-footer").append(
                '<button type="button" class="btn ' + cancelBtnClass + '" data-dismiss="modal" style="min-width: 68px;">'
                + cancelBtnLabel + '</button>'
            );
            // "确认"按钮点击事件
            if (okCallback && typeof okCallback == "function") {
                $("." + dialogSelectorClass).find("." + okBtnClass).unbind().one("click", okCallback);
            }
            // "取消"按钮点击事件
            if (cancelCallback && typeof cancelCallback == "function") {
                $("." + dialogSelectorClass).find("." + cancelBtnClass).unbind().one("click", cancelCallback);
            }
        }
        // 设置弹框水平垂直居中
        $("." + dialogSelectorClass).find(".modal-dialog").css(CSS_NICE_ALERT);
        // 弹框关闭回调事件
        $("." + dialogSelectorClass).on("hidden.bs.modal", function() {
            if (closeCallback && typeof closeCallback == "function") {
                closeCallback();
            }
        });
    }
    var modalOptions = {};
    modalOptions.show = true;
    // 如果不是success弹框，设置按ESC或者点击弹框外不隐藏弹框
    if (!successFlag) {
        modalOptions.backdrop = "static";
        modalOptions.keyboard = false;
    }
    $("." + dialogSelectorClass).modal(modalOptions);
};


var CSS_NICE_ALERT =  {
    "-webkit-transform": "translate(0, -50%)",
    "-ms-transform": "translate(0, -50%)",
    "-o-transform": "translate(0, -50%)",
    "transform": "translate(0, -50%)",

    "position": "absolute",
    "width": "350px",
    "margin": "10px auto",
    "left": "0",
    "right": "0",
    "top": "50%"
};

var _niceAlertTemplate = '' +
'    <div class="modal fade {dialogSelectorClass}" tabindex="-1" role="dialog">\n' +
'        <div class="modal-dialog" role="document">\n' +
'            <div class="modal-content">\n' +
'                <div class="modal-header">\n' +
'                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden>&times;</span></button>\n' +
'                    <h4 class="modal-title" style="color: {titleFontColor};"><span class="{titleIconClass}"></span>{titleLabel}</h4>\n' +
'                </div>\n' +
'                <div class="modal-body">' +
'                   <div class="modal-message">{messageContent}</div>' +
'                </div>\n' +
'                <div class="modal-footer">\n' +
'                    <button type="button" class="btn {okBtnClass}" data-dismiss="modal" style="min-width: 68px;">{okBtnLabel}</button>\n' +
'                </div>\n' +
'            </div>\n' +
'        </div>\n' +
'    </div>';