function handleVirtualKey( value, down )
{
	Module.setKey(value, down);
}

function handleMute(event)
{
	var mute = document.getElementById("mute");
  Module.toggleMute();
  mute.style.visibility = "hidden";
	return false;
}

function handleSnapClick(event)
{
	var selJoy = document.getElementById("joySelect");
	if( selJoy.selectedIndex == 0 ) {
		selJoy.selectedIndex = 1;
		handleJoyConf(false);
	}
	Module.loadSnapshot( document.getElementById("selectGame").value, false );
	return false;
}

function handleSnapJoy()
{
	var joyTest = document.getElementById("call_joy_test");
	var selJoy = document.getElementById("joySelect");
	if( selJoy.selectedIndex == 0 ) {
		selJoy.selectedIndex = 1;
		handleJoyConf(false);
	}
	if( joyTest.innerHTML != joyTest.getAttribute('data-back') ) {
		joyTestSave = Module.saveSnapshotData();
		Module.loadSnapshot( 'Joystick_Test.s64', false );
		joyTest.innerHTML = joyTest.getAttribute('data-back');
	}
	else {
		if(joyTestSave) Module.loadSnapshotData( joyTestSave );
		joyTestSave = null;
		joyTest.innerHTML = 'Joystick Test';
	}
	return false;
}

function handleJoyConf(event)
{
	var joy = document.getElementById("joySelect");
	Module.selectJoystick( joy.value&0xff, joy.value>>8 );
	joy.blur();
	return false;
}

function handleHighscore(event)
{
	var myForm = document.getElementById("highSave");
	var userName = myForm.elements["userName"].value;
	var scoreId = myForm.elements["scoreid"].value;
	var snapName = myForm.elements["game"].value;
	document.getElementById('highScore_status').innerHTML = '';
	Module.uploadHighscore(userName, scoreId, snapName);
	return false;
}

function handleHighscoreCancel(event)
{
	document.getElementById('highScore_status').innerHTML = '';
	Module.cancelHighscore();
	return false;
}

function c64_drag_checkfile(file) {
	var validExt = ['S64', 'D64', 'G64', 'X64', 'ZIP', 'PRG', 'P00', 'T64', 'TAP', 'CRT'];
	var ext = file.name.split('.').pop();
	var exthi = ext.toUpperCase();
	for (var i=0; i < validExt.length; i++) {
		if( ext == validExt[i] || exthi == validExt[i] ) {
			return true;
		}
	}
	return false;
}

function c64_checkfile_type(file, startup) {
  var myForm = document.getElementById('c64_status');
  var selJoy = document.getElementById("joySelect");
  var ext = file.name.split('.').pop();
  var exthi = ext.toUpperCase();
 
  if( startup || exthi == 'S64' || exthi == 'CRT' ) {
	  if( exthi == 'S64' ) {
		  myForm.style='display:none';
	  }
	  else {
		  myForm.style='display:block';	  
	  }
  }

  if( startup || exthi == 'S64' || exthi == 'CRT' ) {	  
      if( selJoy.selectedIndex == 0 || selJoy.selectedIndex == 2 ) {
		  selJoy.selectedIndex = 1;
		  handleJoyConf(false);
	  }
      else if( selJoy.selectedIndex == 3 ) {
		  selJoy.selectedIndex = 4;
		  handleJoyConf(false);
	  }
   }
}

function c64_dragover_handler(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  ev.dataTransfer.dropEffect = 'copy';
}

function c64_drop_handler(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  var myForm = document.getElementById('c64FileInput');
  var startup = (myForm.elements['startup'].checked) ? 1 : 0;
  
  var dt = ev.dataTransfer;
  if( dt.items ) {
    for (var i=0; i < dt.items.length; i++) {
      if (dt.items[i].kind == "file") {
		var f = dt.items[i].getAsFile();
		if( c64_drag_checkfile(f)) {
			Module.loadFile(f, startup);
			c64_checkfile_type(f, startup);		
			break;
		} 
      }
    }
  }
  else {
	for (var i=0; i < dt.files.length; i++) {
		if( c64_drag_checkfile(dt.files[i])) {
			Module.loadFile(dt.files[i], startup); 
			c64_checkfile_type(dt.files[i], startup);
			break;
		} 
	 }
  }
}

function c64_handleDiskInput(event) 
{
  var myForm = document.getElementById('c64FileInput');
  var startup = (myForm.elements['startup'].checked) ? 1 : 0;
  var myfiles = myForm.elements['c64FileDialog'].files;
  for (var i=0; i < myfiles.length; i++) {
	  if( c64_drag_checkfile(myfiles[i])) {
			Module.loadFile(myfiles[i], startup); 
			c64_checkfile_type(myfiles[i], startup);
			break;
		} 
	 }
	return false;
}

function showPic()
{
	var name = document.getElementById("selectGame").value;
	document.getElementById('selectPic').innerHTML = '<img src="c64/pictures/'+name+'.png" height=210 />';
}


function process_touch(ev) {
	if( 0==touchEnabled ) {
		touchEnabled = 1;
		Module.setProperty( 'touchtype', touchType.toString() );
		if(touchType == 1) {
			document.getElementById("canvas_overlay_right").style.display = 'block';
			document.getElementById("canvas_overlay_left").style.display = 'none';			
		}
		else {
			document.getElementById("canvas_overlay_right").style.display = 'none';
			document.getElementById("canvas_overlay_left").style.display = 'block';			
		}
	}
	if( touchEnabled > 0 ) {
		window.clearTimeout(touchTimer);
		touchTimer = window.setTimeout(function(){document.getElementById("canvas_overlay_right").style.display = 'none';document.getElementById("canvas_overlay_left").style.display = 'none';touchEnabled=0;}, 15000);		
	}
}


function openKeyboard()
{
	if(!myKeyboard) myKeyboard = new c64_keyboard();
	myKeyboard.VKI_click(document.getElementById("virtualKeyboard"), handleVirtualKey);
}

function addKeyboardHandler(kb)
{
	kb.addEventListener("mousedown", function() {}, false);
	kb.addEventListener("mouseup", openKeyboard, false);
	kb.addEventListener("touchstart", function(e) { if(e.preventDefault) e.preventDefault(); }, false);
	kb.addEventListener("touchcancel", function(e) { if(e.preventDefault) e.preventDefault(); }, false);
	kb.addEventListener("touchend", function(e) { openKeyboard(); if(e.preventDefault) e.preventDefault(); }, false);
}

function addControlHandler(parent)
{
	const ctrl =
	{
		cmd_fs: function() { Module.requestC64FullScreen(); },
		cmd_tm: function() { Module.toggleMute(); },
		cmd_ss: function() { Module.snapshotStorage(1); },
		cmd_sl: function() { Module.snapshotStorage(0); },
		cmd_uh: function() { Module.uploadHighscore('', '', 'self'); }
	};

	var children = parent.children;
	for (var i = 0; i < children.length; i++)
	{
		var child = children[i];
		if(child.nodeName == "BUTTON")
		{
			if(child.name.startsWith('cmd_'))
			{
				child.addEventListener("click", function(e) {
					ctrl[this.name]();
					}, false);
					
				child.addEventListener("touchstart", function(e) { if(e.preventDefault) e.preventDefault(); }, false);
				child.addEventListener("touchcancel", function(e) { if(e.preventDefault) e.preventDefault(); }, false);
				child.addEventListener("touchend", function(e) { ctrl[this.name](); if(e.preventDefault) e.preventDefault(); }, false);
			}
		}
		else
		{
			addControlHandler(child);
		}
	}
}

function addButtonHandler(parent)
{
	var children = parent.children;
	for (var i = 0; i < children.length; i++)
	{
		var child = children[i];
		if(child.nodeName == "BUTTON")
		{
			if(child.name.startsWith('key_'))
			{
				child.addEventListener("mousedown", function(e) { Module.setKey(this.name.substr(4), 1); }, false);
				child.addEventListener("mouseup", function(e) { Module.setKey(this.name.substr(4), 0); }, false);

				child.addEventListener("touchstart", function(e) { Module.setKey(this.name.substr(4), 1); if(e.preventDefault) e.preventDefault(); }, false);
				child.addEventListener("touchcancel", function(e) { Module.setKey(this.name.substr(4), 0); if(e.preventDefault) e.preventDefault(); }, false);
				child.addEventListener("touchend", function(e) { Module.setKey(this.name.substr(4), 0); if(e.preventDefault) e.preventDefault(); }, false);
			}
			else if(child.name.startsWith('joy_'))
			{
				child.addEventListener("mousedown", function(e) { Module.setJoystick(this.name.substr(4), 1); }, false);
				child.addEventListener("mouseup", function(e) { Module.setJoystick(this.name.substr(4), 0); }, false);
				
				child.addEventListener("touchstart", function(e) { Module.setJoystick(this.name.substr(4), 1); if(e.preventDefault) e.preventDefault(); }, false);
				child.addEventListener("touchcancel", function(e) { Module.setJoystick(this.name.substr(4), 0); if(e.preventDefault) e.preventDefault(); }, false);
				child.addEventListener("touchend", function(e) { Module.setJoystick(this.name.substr(4), 0); if(e.preventDefault) e.preventDefault(); }, false);
			} 
			else if(child.name.startsWith('tape_'))
			{
				child.addEventListener("mousedown", function(e) { Module.setTape(this.name.substr(5)); }, false);
				
				child.addEventListener("touchstart", function(e) { Module.setTape(this.name.substr(5)); if(e.preventDefault) e.preventDefault(); }, false);
			} 
		}
		else
		{
			addButtonHandler(child);
		}
	}
}

function addConfigHandler(parent)
{
	document.getElementById('print_version').addEventListener("click", function(e) {
		e.stopPropagation();
		document.getElementById("c64config_popup").classList.toggle("show");
		}, false);
		
	document.getElementById('config_inverty').addEventListener("click", function(e) {
		var check = document.getElementById('config_inverty');
		Module.setProperty("joy_inverty", check.checked?"48":"0");
		}, false);
		
	document.getElementById('config_fastload').addEventListener("click", function(e) {
		var check = document.getElementById('config_fastload');
		Module.setProperty("disk_fast_loading", check.checked?"1":"0");
		}, false);

	document.getElementById('config_wrprotect').addEventListener("click", function(e) {
		var check = document.getElementById('config_wrprotect');
		Module.setProperty("disk_write_protection", check.checked?"2":"0");
		}, false);

	document.getElementById('config_reset').addEventListener("click", function(e) {
		Module.resetEmulation(1);
		}, false);

	document.getElementById('config_touch').addEventListener("click", function(e) {
		var check = document.getElementById('config_touch');
		touchEnabled = 0;
		touchType = check.checked?2:1;
		process_touch(null);
		}, false);
}


function c64_global_startup()
{
	document.getElementById('print_version').innerHTML = 'V'+Module.getProperty('version')+'/'+Module.getProperty('revision');
	document.getElementById('config_inverty').checked = Module.getProperty("joy_inverty") != '0';
	document.getElementById('config_fastload').checked = Module.getProperty("disk_fast_loading") != '0';
	document.getElementById('config_wrprotect').checked = Module.getProperty("disk_write_protection") != '0';
	document.getElementById('config_touch').checked = Module.getProperty("touchtype") == '2';
}


function changeIcon(url) { document.getElementById("favicon").href = url; }

var arrow_keys_handler = function(e) {
    switch(e.keyCode){
        case 37: case 39: case 38:  case 40: case 8: case 9: case 13:
        case 32: case 17: case 112: case 114: case 116: case 118:
          if ( Module.hasFocus ) {
            e.preventDefault();
          }
          break;
        default: break;
    }
    switch(e.keyCode){
      case 37:
        changeIcon('favicon-left.png');
        break;
      case 39:
        changeIcon('favicon-right.png');
        break;
      case 83:
        Module.saveGame('gridrunner_progress.s64');
        break;
      case 82:
        Module.loadGame('gridrunner_progress.s64');
        break;
      case 72:
        Module.loadHighScoreGame();
        break;
      default:
          break;
    }
};

function addHandler()
{
	if (!String.prototype.startsWith) {
	  String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	  };
	}

	if( window.addEventListener ) {
		window.addEventListener("keydown", arrow_keys_handler);
		window.addEventListener("keyup", arrow_keys_handler);
		window.addEventListener("click", function(e){
			if(document.getElementById("c64config_popup").classList.contains('show')) {
				if(!document.getElementById("c64config_popup").contains(e.target))
					document.getElementById("c64config_popup").classList.remove('show'); 
			}
		});
	}
	else {
		window.attachEvent("onkeydown", arrow_keys_handler);
		window.attachEvent("onkeyup", arrow_keys_handler);
	}
	
	addButtonHandler(document.getElementById("key_field"));
	addKeyboardHandler(document.getElementById("virtualKeyboard"));
	addControlHandler(document.getElementById("controls"));
	addConfigHandler(document.getElementById("c64config_popup"));
		
	document.getElementById("canvas").addEventListener("contextmenu", function(e) {
		e.preventDefault();
		}, false);

	document.getElementById('canvas').addEventListener("touchstart", function(e) {
		process_touch();
		}, false);
	document.getElementById('canvas').addEventListener("touchmove", function(e) {
		process_touch();
		}, false);

	document.getElementById('help_div').addEventListener("click", function(e) {
		this.style.display='none';
		}, false);

	document.getElementById('call_joy_test').addEventListener("mousedown", function(e) {
		handleSnapJoy();
		}, false);

	document.getElementById('id_joyconf').addEventListener("submit", function(e) {
		e.preventDefault();
		handleJoyConf();
		}, false);
		
	document.getElementById('joySelect').addEventListener("change", function(e) {
		handleJoyConf();
		}, false);

	document.getElementById('c64FileInput').addEventListener("submit", function(e) {
		e.preventDefault();
		c64_handleDiskInput();
		}, false);

	document.getElementById('drop_zone').addEventListener("click", function(e) {
		document.getElementById('c64FileInput').elements['c64FileDialog'].click();
		}, false);

	document.getElementById('drop_zone').addEventListener("dragover", function(e) {
		c64_dragover_handler(e);
		}, false);

	document.getElementById('drop_zone').addEventListener("drop", function(e) {
		c64_drop_handler(e);
		}, false);

	document.getElementById('c64fd').addEventListener("change", function(e) {
		c64_handleDiskInput();
		}, false);
		
	document.getElementById('snap_form').addEventListener("submit", function(e) {
		e.preventDefault();
		handleSnapClick();
		}, false);

	document.getElementById('mute').addEventListener("click", function(e) {
		e.preventDefault();
		handleMute();
		}, false);
}

var myKeyboard = false;
var touchEnabled = 0;
var touchType = 1;
var touchTimer = null;
var joyTestSave = null;
Module.setStatus('Downloading...');
addHandler();




