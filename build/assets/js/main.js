// = jquery/jquery.min.js
// = bootstrap/bootstrap.min.js
// = wow/wow.min.js

$(function() {
    //  changes mouse cursor when highlighting loawer right of box
    $(".write-ToUs__form-control-comment").mousemove(function(e) {
        var myPos = $(this).offset();
        myPos.bottom = $(this).offset().top + $(this).outerHeight();
        myPos.right = $(this).offset().left + $(this).outerWidth();

        if (myPos.bottom > e.pageY && e.pageY > myPos.bottom - 16 && myPos.right > e.pageX && e.pageX > myPos.right - 16) {
            $(this).css({ cursor: "nw-resize" });
        }
        else {
            $(this).css({ cursor: "" });
        }
    })
    //  the following simple make the textbox "Auto-Expand" as it is typed in
        .keyup(function(e) {
            //  this if statement checks to see if backspace or delete was pressed, if so, it resets the height of the box so it can be resized properly
            if (e.which === 8 || e.which === 46) {
                $(this).height(parseFloat($(this).css("min-height")) !== 0 ? parseFloat($(this).css("min-height")) : parseFloat($(this).css("font-size")));
            }
            //  the following will help the text expand as typing takes place
            while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
                $(this).height($(this).height()+1);
            }
        });
});


jQuery(document).ready(function(){
    jQuery('.menu-burger').click(function () {
        jQuery(this).toggleClass('active');
    });
});

////////////////////

var DragManager = new function() {

    /**
     * составной объект для хранения информации о переносе:
     * {
     *   elem - элемент, на котором была зажата мышь
     *   avatar - аватар
     *   downX/downY - координаты, на которых был mousedown
     *   shiftX/shiftY - относительный сдвиг курсора от угла элемента
     * }
     */
    var dragObject = {};

    var self = this;

    function onMouseDown(e) {

        if (e.which != 1) return;

        var elem = e.target.closest('.censorship');
        if (!elem) return;

        dragObject.elem = elem;

        // запомним, что элемент нажат на текущих координатах pageX/pageY
        dragObject.downX = e.pageX;
        dragObject.downY = e.pageY;

        return false;
    }

    function onMouseMove(e) {
        if (!dragObject.elem) return; // элемент не зажат

        if (!dragObject.avatar) { // если перенос не начат...
            var moveX = e.pageX - dragObject.downX;
            var moveY = e.pageY - dragObject.downY;

            // если мышь передвинулась в нажатом состоянии недостаточно далеко
            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return;
            }

            // начинаем перенос
            dragObject.avatar = createAvatar(e); // создать аватар
            if (!dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
                dragObject = {};
                return;
            }

            // аватар создан успешно
            // создать вспомогательные свойства shiftX/shiftY
            var coords = getCoords(dragObject.avatar);
            dragObject.shiftX = dragObject.downX - coords.left;
            dragObject.shiftY = dragObject.downY - coords.top;

            startDrag(e); // отобразить начало переноса
        }

        // отобразить перенос объекта при каждом движении мыши
        dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
        dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

        return false;
    }

    function onMouseUp(e) {
        if (dragObject.avatar) { // если перенос идет
            finishDrag(e);
        }

        // перенос либо не начинался, либо завершился
        // в любом случае очистим "состояние переноса" dragObject
        dragObject = {};
    }

    function finishDrag(e) {
        var dropElem = findDroppable(e);

        if (!dropElem) {
            self.onDragCancel(dragObject);
        } else {
            self.onDragEnd(dragObject, dropElem);
        }
    }

    function createAvatar(e) {

        // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
        var avatar = dragObject.elem;
        var old = {
            parent: avatar.parentNode,
            nextSibling: avatar.nextSibling,
            position: avatar.position || '',
            left: avatar.left || '',
            top: avatar.top || '',
            zIndex: avatar.zIndex || ''
        };

        // функция для отмены переноса
        avatar.rollback = function() {
            old.parent.insertBefore(avatar, old.nextSibling);
            avatar.style.position = old.position;
            avatar.style.left = old.left;
            avatar.style.top = old.top;
            avatar.style.zIndex = old.zIndex
        };

        return avatar;
    }

    function startDrag(e) {
        var avatar = dragObject.avatar;

        // инициировать начало переноса
        document.body.appendChild(avatar);
        avatar.style.zIndex = 9999;
        avatar.style.position = 'absolute';
    }

    function findDroppable(event) {
        // спрячем переносимый элемент
        dragObject.avatar.hidden = true;

        // получить самый вложенный элемент под курсором мыши
        var elem = document.elementFromPoint(event.clientX, event.clientY);

        // показать переносимый элемент обратно
        dragObject.avatar.hidden = false;

        if (elem == null) {
            // такое возможно, если курсор мыши "вылетел" за границу окна
            return null;
        }

        return elem.closest('.droppable');
    }

    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
    document.onmousedown = onMouseDown;

    this.onDragEnd = function(dragObject, dropElem) {};
    this.onDragCancel = function(dragObject) {};

};


function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}

DragManager.onDragCancel = function(dragObject) {
    dragObject.avatar.rollback();
};

DragManager.onDragEnd = function(dragObject, dropElem) {
    dragObject.elem.style.display = 'none';
    dropElem.classList.add('computer-smile');
    setTimeout(function() {
        dropElem.classList.remove('computer-smile');
    }, 200);
};


let tabId1 = ['#v-pills-home-tab1', '#v-pills-profile-tab1', '#v-pills-messages-tab1', '#v-pills-settings-tab1', '#v-pills-settings-tab2'];
let imgId1 = ['#bootstrap-item', '#sass-item', '#html-item', '#css-item', '#vue-item'];

let tabId2 = ['#v-pills-home-tab2', '#v-pills-profile-tab2', '#v-pills-messages-tab2'];
let imgId2 = ['#laravel-item', '#php-item', '#mySQL-item'];

for(let i = 0; i <= tabId1.length; i++) {
    $(tabId1[i]).click(function () {
        $('.technologies-container__front img').removeClass('active');
        $(imgId1[i]).toggleClass('active');
        $('.technologies-description_front').removeClass('show');
    });
}

for(let i = 0; i <= tabId2.length; i++) {
    $(tabId2[i]).click(function () {
        $('.technologies-container__back img').removeClass('active');
        $(imgId2[i]).toggleClass('active');
        $('.technologies-description_back').removeClass('show');
    })
}

for(let i = 0; i <= imgId1.length; i++) {
    $(imgId1[i]).click(function () {
        $(tabId1[i]).click();
        $('.technologies-description_front').removeClass('show');
    });
}

for(let i = 0; i <= imgId2.length; i++) {
    $(imgId2[i]).click(function () {
        $(tabId2[i]).click();
        $('.technologies-description_back').removeClass('show');
    });
}

$('.technologies-block__close-front').click(function () {
    $('.tab-pane_front').removeClass('show').removeClass('active');
    $('.nav_front .nav-link').removeClass('active');
    $('.technologies-container__front img').removeClass('active');
    $('.technologies-description_front').addClass('show');
});

$('.technologies-block__close-back').click(function () {
    $('.tab-pane_back').removeClass('show').removeClass('active');
    $('.nav_back .nav-link').removeClass('active');
    $('.technologies-container__back img').removeClass('active');
    $('.technologies-description_back').addClass('show');
});




// var controller = new ScrollMagic.Controller();
// var scene = new ScrollMagic.Scene({
//     triggerElement: "#trigger"
// })
//     .setTween("#animate1", 0.5, {scale: 2.5}) // trigger a TweenMax.to tween
//     .addIndicators() // add indicators (requires plugin)
//     .addTo(controller);


var controller = new ScrollMagic.Controller();
var tween1,
    tween2,
    tween3,
    tween4,
    tween5;

tween1 = TweenMax.to("#animate1", 0.5, {top: '70px'});
var scene1 = new ScrollMagic.Scene({triggerElement: "#trigger", duration: "100%", offset: -20})
    .setTween(tween1)
    .addIndicators()
    .addTo(controller);


tween2 = TweenMax.to("#animate2", 0.5, {top: '50px'});
var scene2 = new ScrollMagic.Scene({triggerElement: "#trigger", duration: "100%", offset: -20})
    .setTween(tween2)
    .addIndicators()
    .addTo(controller);


tween3 = TweenMax.to("#animate3", 0.5, {top: '29px'});
var scene3 = new ScrollMagic.Scene({triggerElement: "#trigger", duration: "100%", offset: -20})
    .setTween(tween3)
    .addIndicators()
    .addTo(controller);


tween4 = TweenMax.to(".design-system__diagram-wrapper", 0.5, {bottom: '100px', opacity: '0'});
var scene4 = new ScrollMagic.Scene({triggerElement: "#trigger_colorPalette", duration: "60%", offset: -150})
    .setTween(tween4)
    .addIndicators()
    .addTo(controller);


tween5 = TweenMax.to(".golden-ratio", 0.5, {top: '0', opacity: '1'});
var scene5 = new ScrollMagic.Scene({triggerElement: "#trigger_golden-ratio", duration: "40%", offset: -500})
    .setTween(tween5)
    .addIndicators()
    .addTo(controller);