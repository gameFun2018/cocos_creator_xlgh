require=function i(s,c,r){function l(t,e){if(!c[t]){if(!s[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(u)return u(t,!0);var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}var a=c[t]={exports:{}};s[t][0].call(a.exports,function(e){return l(s[t][1][e]||e)},a,a.exports,i,s,c,r)}return c[t].exports}for(var u="function"==typeof require&&require,e=0;e<r.length;e++)l(r[e]);return l}({DataManager:[function(e,t,n){"use strict";cc._RF.push(t,"40045ltXJVKT5IDLvfpJZRA","DataManager"),cc.Class({extends:cc.Component,properties:{CurScore:{default:0,type:cc.Integer},CurGold:{default:0,type:cc.Integer},IsShareRelive:{default:!1},_ShareReliveCount:0,_ShareTitle:"",_ShareImageUrl:""},start:function(){cc.log("DataManager start")},getCurScore:function(){return this.CurScore},setCurScore:function(e){this.CurScore=e},getCurGold:function(){return this.CurGold},setCurGold:function(e){this.CurGold=e},setShareRelive:function(e){null!=e&&(this.IsShareRelive=e)},getShareRelive:function(){return this.IsShareRelive},setShareTitle:function(e){this._ShareTitle=e},getShareTitle:function(){return this._ShareTitle},setShareImage:function(e){this._ShareImageUrl=e},getShareImage:function(){return this._ShareImageUrl},setShareReliveCount:function(e){this._ShareReliveCount=e},getShareReliveCount:function(){return this._ShareReliveCount}}),cc._RF.pop()},{}],Game:[function(e,t,n){"use strict";cc._RF.push(t,"3b49b9cEH9FRLyZW0WteHSN","Game"),cc.Class({extends:cc.Component,properties:{UIMgrNode:cc.Node},onLoad:function(){},start:function(){}}),cc._RF.pop()},{}],ItemManager:[function(e,t,n){"use strict";cc._RF.push(t,"7a6f7YOvh9JWIK5Wk4nbCT/","ItemManager");var o={IT_None:-1,IT_Grass:0,IT_Corn:1,IT_Radish:2,IT_Coin:3},a=cc.Class({extends:cc.Component,properties:{ItemPrefabList:{default:[],type:[cc.Prefab]},ItemRateList:{default:[],type:[cc.Integer]},_RandBaseNum:100,_RandRateList:[],_ItemPoolList:[]},onLoad:function(){for(var e=this._RandBaseNum=0;e<this.ItemRateList.length;++e)this._RandBaseNum+=this.ItemRateList[e],this._RandRateList[e]=0==e?this.ItemRateList[e]:this._RandRateList[e-1]+this.ItemRateList[e];for(var t=0;t<4;++t){this._ItemPoolList[t]=new cc.NodePool;for(var n=0;n<3;++n){var o=cc.instantiate(this.ItemPrefabList[t]);this._ItemPoolList[t].put(o),o.group="item",o.setTag(t)}}},start:function(){},getRandomItemType:function(){for(var e=parseInt(cc.random0To1()*this._RandBaseNum),t=0;t<this._RandRateList.length&&!(e<this._RandRateList[t]);++t);return t-1},getItemByType:function(e){if(e==o.IT_None)return null;if(3<e||e<0)return null;var t=this._ItemPoolList[e].get();return null==t&&(t=cc.instantiate(this.ItemPrefabList[e]),this._ItemPoolList[e].put(t),t.group="item",t.setTag(e),t=this._ItemPoolList[e].get(),cc.log("new item ",e)),t.scale=.7,t},putItemToPool:function(e){if("item"==e.group){e.parent=null;var t=e.getTag();3<t||t<0||this._ItemPoolList[t].put(e)}}});t.exports={ItemType:o,ItemManager:a},cc._RF.pop()},{}],Net:[function(e,t,n){"use strict";cc._RF.push(t,"532f3II0n1NR4XoxI573aWp","Net"),cc.Class({extends:cc.Component,properties:{_DataManager:null},onLoad:function(){var e=cc.find("DataManager");this._DataManager=e.getComponent("DataManager")},start:function(){var n=this,o=new XMLHttpRequest;o.onreadystatechange=function(){if(4==o.readyState&&200<=o.status&&o.status<400){var e=o.responseText;if(console.log(e),n._DataManager){var t=JSON.parse(e);console.log(t),n._DataManager.setShareRelive(t.isShareRelive),n._DataManager.setShareTitle(t.shareTitle),n._DataManager.setShareImage(t.shareImage)}}},o.open("GET","https://xiao.zhuceqq.com/config.txt",!0),o.send()}}),cc._RF.pop()},{}],Player:[function(e,t,n){"use strict";cc._RF.push(t,"e11dcoKmHBHFIO338w4ao7F","Player"),cc.Class({extends:cc.Component,properties:{_UIGameNode:cc.Node},start:function(){this._UIGameNode=cc.find("Canvas/UIManager/UIGame")},jump:function(e,t){var n=cc.jumpBy(e,t,80,1),o=cc.callFunc(this.onJumpEnd,this),a=cc.sequence(n,o);0<t.x?this.node.setScaleX(1):this.node.setScaleX(-1),this.node.runAction(a)},jumpTo:function(e,t){var n=cc.jumpTo(e,t,80,1),o=cc.callFunc(this.onJumpEnd,this),a=cc.sequence(n,o);0<t.x?this.node.setScaleX(1):this.node.setScaleX(-1),this.node.runAction(a)},onJumpEnd:function(){this._UIGameNode.getComponent("UIGame").onPlayerJumpEnd()}}),cc._RF.pop()},{}],SoundManager:[function(e,t,n){"use strict";cc._RF.push(t,"0fd9cAQtcdG+7PbX8bBx4Ax","SoundManager");var o=e("SoundType");cc.Class({extends:cc.Component,properties:{SoundList:{default:[],type:[cc.AudioClip]},_PlayList:[]},start:function(){this.playSound(o.SoundType_Bg)},playSound:function(e){if(e.ID>=this.SoundList.length)cc.log("playSound resIndex invalid ");else if(e.IsLoop){if(null==this._PlayList[e.ID]||null==this._PlayList[e.ID]||-1==this._PlayList[e.ID]){var t=cc.audioEngine.play(this.SoundList[e.ID],e.IsLoop);this._PlayList[e.ID]=t}}else{t=cc.audioEngine.play(this.SoundList[e.ID],e.IsLoop);this._PlayList[e.ID]=t}},stopSound:function(e){e.ID>=this.SoundList.length?cc.log("stopSound resIndex invalid "):-1!=this._PlayList[e.ID]&&null!=this._PlayList[e.ID]?(cc.audioEngine.stop(this._PlayList[e.ID]),this._PlayList[e.ID]=-1):cc.log("stopSound not play")}}),cc._RF.pop()},{SoundType:"SoundType"}],SoundType:[function(e,t,n){"use strict";cc._RF.push(t,"d3101dt4dBBUZdG5k7GIEkV","SoundType");t.exports={SoundType_Bg:{ID:0,IsLoop:!0},SoundType_Jump:{ID:1,IsLoop:!1},SoundType_GetGold:{ID:2,IsLoop:!1},SoundType_Fall:{ID:3,IsLoop:!1}},cc._RF.pop()},{}],UIGameOver:[function(e,t,n){"use strict";cc._RF.push(t,"3dd483U9ZVGN5zzCmfY6awR","UIGameOver");var a=e("UIType");cc.Class({extends:cc.Component,properties:{ScoreLabel:{default:null,type:cc.Label},GoldLabel:{default:null,type:cc.Label},RelifeBtn:{default:null,type:cc.Button},OkBtn:{default:null,type:cc.Button},ShareRelifeBtn:{default:null,type:cc.Button},GoldNotLabel:{default:null,type:cc.Label},_DataManager:cc.Node},onLoad:function(){this._DataManager=cc.find("DataManager")},start:function(){this.node.on(cc.Node.EventType.TOUCH_END,this.onUIClick,this),this.RelifeBtn.node.on(cc.Node.EventType.TOUCH_END,this.onRelifeBtn,this),this.OkBtn.node.on(cc.Node.EventType.TOUCH_END,this.onOkBtn,this),this.ShareRelifeBtn.node.on(cc.Node.EventType.TOUCH_END,this.onShareRelifeBtn,this)},onEnable:function(){var e=this._DataManager.getComponent("DataManager");this.ScoreLabel.string=e.getCurScore().toString(),this.GoldLabel.string=e.getCurGold().toString(),this.GoldNotLabel.node.active=!1,this.ShareRelifeBtn&&(e.getShareReliveCount()<=0?this.ShareRelifeBtn.node.active=e.getShareRelive():this.ShareRelifeBtn.node.active=!1)},onDisable:function(){},onUIClick:function(e){e.stopPropagation()},onRelifeBtn:function(e){var t=this._DataManager.getComponent("DataManager"),n=t.getCurGold();if(n<20)this.GoldNotLabel.node.active=!0;else{t.setCurGold(n-20);var o=this.node.parent.getComponent("UIManager");o.closeUI(a.UIType_GameOver),o.getUI(a.UIType_Game).reset(!1),e.stopPropagation()}},onOkBtn:function(e){var t=this.node.parent.getComponent("UIManager");t.closeUI(a.UIType_GameOver),t.openUI(a.UIType_Rank),e.stopPropagation()},onShareRelifeBtn:function(e){var n=this,o=this._DataManager.getComponent("DataManager");null!=window.wx&&wx.shareAppMessage({title:o.getShareTitle(),imageUrl:o.getShareImage(),success:function(e){console.log("shareAppMessage success"),wx.showToast({title:"复活成功",icon:"success",duration:1500}),o.setShareReliveCount(o.getShareReliveCount()+1);var t=n.node.parent.getComponent("UIManager");t.closeUI(a.UIType_GameOver),t.getUI(a.UIType_Game).reset(!1)},fail:function(e){console.log("shareAppMessage fail")}}),e.stopPropagation()}}),cc._RF.pop()},{UIType:"UIType"}],UIGame:[function(e,t,n){"use strict";cc._RF.push(t,"da6fdAt6k1DQqg7TboDDP5E","UIGame");var c=e("UIType"),f=e("SoundType"),S=e("ItemManager"),l=0,r=1,_=2,u=3,m=4;cc.Class({extends:cc.Component,properties:{StartBtn:{default:null,type:cc.Button},PauseBtn:{default:null,type:cc.Button},Score_OneJump:{default:1,type:cc.Integer},TipInfoLabel:{default:null,type:cc.Label},ScoreLabel:{default:null,type:cc.Label},GoldLabel:{default:null,type:cc.Label},BlockPrefab:cc.Prefab,BlockInitNode:cc.Node,BlockNode:cc.Node,DataMgrNode:cc.Node,PlayerNode:cc.Node,TipOpSprite:cc.Sprite,BlockOffVec:cc.v2(80,80),DataManager:cc.Node,SoundManager:cc.Node,ItemManager:S.ItemManager,_BlockPool:cc.NodePool,_BlockList:[],_BlockListUse:[],_BlockTopPos:cc.v2(0,0),_CurGameState:-1,_CurBlockIndex:0,_OffPlayerUIGame:cc.v2(0,0)},onLoad:function(){this.DataManager=cc.find("DataManager"),this.SoundManager=cc.find("SoundManager"),this.ItemManager=cc.find("ItemManager").getComponent(S.ItemManager),this._BlockPool=new cc.NodePool;for(var e=0;e<30;++e){var t=cc.instantiate(this.BlockPrefab);this.pushBlock(t)}},start:function(){if(cc.director.setDisplayStats(!1),null!=window.wx){wx.showShareMenu({withShareTicket:!0});var e=this.DataManager.getComponent("DataManager");wx.onShareAppMessage(function(){return{title:e.getShareTitle(),imageUrl:e.getShareImage()}})}this.SoundManager&&this.SoundManager.getComponent("SoundManager").playSound(f.SoundType_Bg),this.StartBtn.node.on(cc.Node.EventType.TOUCH_START,this.onStartBtnStart,this),this.StartBtn.node.on(cc.Node.EventType.TOUCH_END,this.onStartBtn,this),this.PauseBtn.node.on(cc.Node.EventType.TOUCH_END,this.onPauseBtn,this),this.node.on(cc.Node.EventType.TOUCH_START,this.onScreenTouch,this);var t=this.initSceneBlock();this._BlockTopPos=t.getChildByName("BlockTop").position,this.initPlayerPos(t);var n=this.PlayerNode.parent.convertToWorldSpaceAR(this.PlayerNode.position);this._OffPlayerUIGame=this.node.convertToNodeSpaceAR(n),this.setGameState(l),this._CurBlockIndex=0,this.TipOpSprite.node.active=!0},onStartBtn:function(e){this.setGameState(_),null!=window.wx&&wx.triggerGC(),this.TipOpSprite.node.active=!1,e.stopPropagation()},onPauseBtn:function(){this.setGameState(r),event.stopPropagation()},onScreenTouch:function(e){e.stopPropagation(),this.onGameTouch(e.getLocationX())},onGameTouch:function(e){if(this._CurGameState==l&&(this.setGameState(_),null!=window.wx&&wx.triggerGC(),this.TipOpSprite.node.active=!1),!(this._CurGameState!=_&&this._CurGameState!=u||this._CurGameState==u&&(this.onPlayerJumpEnd(),this._CurGameState==m))){cc.log("touch end",e,this.node.width);var t=this.node.convertToNodeSpaceAR(cc.v2(e,0));cc.log("touch end pos ",t.x,this.node.width);var n=1;if(n=0<=t.x?1:-1,this._CurBlockIndex<0||this._CurBlockIndex>=this._BlockListUse.length-1)console.log("onScreenTouch invalid _CurBlockIndex ",this._CurBlockIndex);else{var o=this._BlockListUse[this._CurBlockIndex+1];if(null!=o){this.PlayerNode.stopAllActions();var a=cc.pAdd(this._BlockTopPos,o.position),i=cc.pSub(a,this.PlayerNode.position),s=cc.v2(n*Math.abs(i.x),i.y);this.PlayerNode.getComponent("Player").jump(.15,s),this.PlayerNode.setTag(n),this.BlockNode.stopAllActions();var c=cc.pSub(this._OffPlayerUIGame,a);s=cc.pSub(c,this.BlockNode.position);var r=cc.moveBy(.15,s);this.BlockNode.runAction(r),this.setGameState(u),this.SoundManager.getComponent("SoundManager").playSound(f.SoundType_Jump)}else console.log("onScreenTouch invalid nextBlock null",this._CurBlockIndex+1)}}},onPlayerJumpEnd:function(){if(this._CurGameState!=m){var e=this._BlockListUse.length,t=this._BlockListUse[e-1].position,n=this.getBlock();if(n.stopAllActions(),n.parent=this.BlockNode,-(n.scaleY=1)!=(l=this.ItemManager.getRandomItemType())&&0<n.childrenCount){var o=n.children[0];if(o)this.ItemManager.getItemByType(l).parent=o}var a=0<=cc.randomMinus1To1()?1:-1,i=cc.v2(this.BlockOffVec.x*a,this.BlockOffVec.y);if(t=cc.pAdd(t,i),n.position=t,this._CurBlockIndex+=1,this._CurBlockIndex<1)cc.log("onPlayerJumpEnd invalid _CurBlockIndex");else{var s=this.PlayerNode.getTag();n=this._BlockListUse[this._CurBlockIndex];var c=this._BlockListUse[this._CurBlockIndex-1];if(0<s&&n.position.x>c.position.x||s<0&&n.position.x<c.position.x){this.setGameState(_);var r=this.DataManager.getComponent("DataManager"),l=-1;if(0<n.childrenCount){var u=n.children[0];0<u.childrenCount&&(l=u.children[0].getTag())}var h=0,p=0;switch(l){case S.ItemType.IT_None:h=this.Score_OneJump;break;case S.ItemType.IT_Grass:h=5;break;case S.ItemType.IT_Corn:h=20;break;case S.ItemType.IT_Radish:h=10;break;case S.ItemType.IT_Coin:p=1}if(h>this.Score_OneJump){this.TipInfoLabel.string="+ "+h.toString(),this.TipInfoLabel.node.stopAllActions(),this.TipInfoLabel.node.color.setA(0);var d=cc.fadeIn(.1),g=cc.delayTime(1.5),I=cc.callFunc(this.onHideTip,this);this.TipInfoLabel.node.runAction(cc.sequence(d,g,I))}if(0<p)this.SoundManager.getComponent("SoundManager").playSound(f.SoundType_GetGold);r.setCurScore(r.getCurScore()+h),r.setCurGold(r.getCurGold()+p),this.updateUIData()}else this.setGameState(m);this.restoreItemToPool(n),5<this._CurBlockIndex&&this.delelteUseBlock()}}},onHideTip:function(){this.TipInfoLabel.string=""},onBlockDownFinish:function(e){0<=this._CurBlockIndex&&this._CurBlockIndex<this._BlockListUse.length&&this._BlockListUse[this._CurBlockIndex]===e&&this._CurGameState==_&&this.setGameState(m)},initSceneBlock:function(){for(var e,t=this.BlockInitNode.parent.convertToWorldSpaceAR(this.BlockInitNode.position),n=this.BlockNode.convertToNodeSpaceAR(t),o=0;o<30;++o){var a=this.getBlock();a.stopAllActions(),a.parent=this.BlockNode,a.scaleY=1;var i=this.ItemManager.getRandomItemType();if(-1!=i&&0!=o&&0<a.childrenCount){var s=a.children[0];if(s)this.ItemManager.getItemByType(i).parent=s}if(0==o)a.position=n,e=a;else{var c=0<=cc.randomMinus1To1()?1:-1,r=cc.v2(this.BlockOffVec.x*c,this.BlockOffVec.y);n=cc.pAdd(n,r),a.position=n,a.setLocalZOrder(-n.y)}}return e},initPlayerPos:function(e){this.PlayerNode.position=cc.pAdd(e.position,this._BlockTopPos),this.PlayerNode.setLocalZOrder(1e5)},getBlock:function(){if(0<this._BlockList.length){var e=this._BlockList.pop();return this._BlockListUse.push(e),e}e=cc.instantiate(this.BlockPrefab);return this.pushBlock(e),this.getBlock()},pushBlock:function(e){this._BlockList.push(e)},delelteUseBlock:function(){var e=this._BlockListUse.shift();e.parent=null,e.scaleY=1,this.restoreItemToPool(e),this._BlockList.push(e),this._CurBlockIndex-=1},restoreItemToPool:function(e){if(0<e.childrenCount){var t=e.children[0];if(0<t.childrenCount){var n=t.children[0];this.ItemManager.putItemToPool(n)}}},updateUIData:function(){var e=this.DataManager.getComponent("DataManager");this.ScoreLabel.string=e.getCurScore(),this.GoldLabel.string=e.getCurGold()},setGameState:function(e){if(this._CurGameState==r&&e!=this._CurGameState&&cc.director.resume(),this._CurGameState=e,this._CurGameState==l)this.StartBtn.node.active=!0,this.PauseBtn.node.active=!1;else if(this._CurGameState==r)cc.director.pause(),this.StartBtn.node.active=!0,this.PauseBtn.node.active=!1;else if(this._CurGameState==_){if(this.StartBtn.node.active=!1,this.PauseBtn.node.active=!0,this._CurBlockIndex<0||this._CurBlockIndex>=this._BlockListUse.length)return void cc.log("GS_WaitOP invalid _CurBlockIndex ",this._CurBlockIndex);var t=this._BlockListUse[this._CurBlockIndex];if(null==t)return void cc.log("GS_WaitOP invalid curBlock null",this._CurBlockIndex);var n=t.getActionByTag(0);if(null==n){var o=cc.scaleTo(1.5,1,0),a=cc.callFunc(this.onBlockDownFinish,this,t);n=cc.sequence(o,a),t.runAction(n)}}else if(this._CurGameState==m){this.StartBtn.node.active=!1,this.PauseBtn.node.active=!1,this.node.parent.getComponent("UIManager").openUI(c.UIType_GameOver);var i=this.DataManager.getComponent("DataManager");if(null!=window.wx&&window.wx.postMessage({msgType:1,bestScore:i.getCurScore()}),this.SoundManager){var s=this.SoundManager.getComponent("SoundManager");s.stopSound(f.SoundType_Bg),s.playSound(f.SoundType_Fall)}}},reset:function(e){var t=this.DataManager.getComponent("DataManager");e&&(t.setCurScore(0),t.setCurGold(0)),this.updateUIData();for(var n=0;n<this._BlockListUse.length;++n){var o=this._BlockListUse[n];this.restoreItemToPool(o),this._BlockList.push(o)}this._BlockListUse.splice(0,this._BlockListUse.length),this._CurBlockIndex=0,this.BlockNode.removeAllChildren(),this.PlayerNode.parent=this.BlockNode;var a=this.initSceneBlock();this._BlockTopPos=a.getChildByName("BlockTop").position,this.initPlayerPos(a),this.setGameState(l),this.TipOpSprite.node.active=!0,this.SoundManager&&this.SoundManager.getComponent("SoundManager").playSound(f.SoundType_Bg)},update:function(e){if(this._CurGameState==_){if(this._CurBlockIndex<0||this._CurBlockIndex>=this._BlockListUse.length)return;var t=this._BlockListUse[this._CurBlockIndex];if(null==t)return;this.PlayerNode.y=t.y+this._BlockTopPos.y*t.scaleY}}}),cc._RF.pop()},{ItemManager:"ItemManager",SoundType:"SoundType",UIType:"UIType"}],UIManager:[function(e,t,n){"use strict";cc._RF.push(t,"6c56eFkIKVAGruXbQvXYBV9","UIManager");e("UIType");cc.Class({extends:cc.Component,properties:{UIList:{default:[],type:[cc.Node]}},start:function(){},getUIScriptName:function(e){return["UIGame","UIGameOver","UIGame"][e]},openUI:function(e){e>=this.UIList.length?cc.log("openUI invalid uiType, please check UIList"):null!=this.UIList[e]&&null!=this.UIList[e]?this.UIList[e].active=!0:cc.log("openUI invalid uiType, object null")},closeUI:function(e){e>=this.UIList.length?cc.log("closeUI invalid uiType, please check UIList"):this.UIList[e].active=!1},getUI:function(e){if(!(e>=this.UIList.length))return this.UIList[e].getComponent(this.getUIScriptName(e));cc.log("closeUI invalid uiType, please check UIList")}}),cc._RF.pop()},{UIType:"UIType"}],UIRank:[function(e,t,n){"use strict";cc._RF.push(t,"4f866ABoT1Klowhxje6eh8X","UIRank");var o=e("UIType");cc.Class({extends:cc.Component,properties:{ScoreLabel:{default:null,type:cc.Label},XuanYaoBtn:{default:null,type:cc.Button},AgainBtn:{default:null,type:cc.Button},FriendRankBtn:{default:null,type:cc.Button},GroupRankBtn:{default:null,type:cc.Button},RankContentSprite:{default:null,type:cc.Sprite},RankSelectSprite:{default:null,type:cc.Sprite},DataManager:cc.Node,_Texture:cc.Texture2D},onLoad:function(){this.DataManager=cc.find("DataManager"),this._Texture=new cc.Texture2D},start:function(){this.node.on(cc.Node.EventType.TOUCH_END,this.onUIClick,this),this.XuanYaoBtn.node.on(cc.Node.EventType.TOUCH_END,this.onXuanYaoClick,this),this.AgainBtn.node.on(cc.Node.EventType.TOUCH_END,this.onAgainClick,this),this.FriendRankBtn.node.on(cc.Node.EventType.TOUCH_END,this.onFriendRankClick,this),this.GroupRankBtn.node.on(cc.Node.EventType.TOUCH_END,this.onGroupRankClick,this),window.wx},onEnable:function(){var e=this.DataManager.getComponent("DataManager");this.ScoreLabel.string=e.getCurScore().toString();e=this.DataManager.getComponent("DataManager");null!=window.wx&&window.wx.postMessage({msgType:2}),this.RankSelectSprite.node.x=this.FriendRankBtn.node.x},onDisable:function(){},onUIClick:function(e){e.stopPropagation()},onXuanYaoClick:function(e){if(null!=window.wx){var t=this.DataManager.getComponent("DataManager");wx.shareAppMessage({title:t.getShareTitle(),imageUrl:t.getShareImage()})}e.stopPropagation()},onAgainClick:function(e){var t=this.node.parent.getComponent("UIManager");t.closeUI(o.UIType_Rank),t.getUI(o.UIType_Game).reset(!0),this.DataManager.getComponent("DataManager").setShareReliveCount(0),e.stopPropagation()},onFriendRankClick:function(e){this.RankSelectSprite.node.x=this.FriendRankBtn.node.x,null!=window.wx&&window.wx.postMessage({msgType:2}),e.stopPropagation()},onGroupRankClick:function(e){var t=this;if(this.RankSelectSprite.node.x=this.GroupRankBtn.node.x,null!=window.wx){var n=this.DataManager.getComponent("DataManager");window.wx.shareAppMessage({title:n.getShareTitle(),imageUrl:n.getShareImage(),success:function(e){null!=e.shareTickets&&0<e.shareTickets.length&&(console.log("shareAppMessage success",e.shareTickets[0]),window.wx.postMessage({msgType:3,shareTicket:e.shareTickets[0]}))},fail:function(e){t.RankSelectSprite.node.x=t.FriendRankBtn.node.x}}),e.stopPropagation()}else e.stopPropagation()},_updateSubDomainCanvas:function(){this._Texture&&window.sharedCanvas&&(this._Texture.initWithElement(window.sharedCanvas),this._Texture.handleLoadedTexture(),this.RankContentSprite.spriteFrame=new cc.SpriteFrame(this._Texture))},update:function(e){this._updateSubDomainCanvas()}}),cc._RF.pop()},{UIType:"UIType"}],UIType:[function(e,t,n){"use strict";cc._RF.push(t,"91b1bYsK1ZOVLnNBkOd9lOU","UIType");t.exports={UIType_Game:0,UIType_GameOver:1,UIType_Rank:2},cc._RF.pop()},{}]},{},["DataManager","Game","ItemManager","Net","Player","SoundManager","SoundType","UIGame","UIGameOver","UIManager","UIRank","UIType"]);