(this.webpackJsonpreversi=this.webpackJsonpreversi||[]).push([[0],[,,,,,,,,,function(e,t,r){e.exports=r(22)},,,,,function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),i=r(8),o=r.n(i),u=(r(14),r(1)),s=r(2),c=r(4),l=r(3),v=r(5),h=(r(15),r(6)),f=(r(16),r(17),Object.freeze({random:{name:"Random Player"},hungry:{name:"Hungry Player"},simple:{name:"Simple Player"},strong:{name:"Strong Player"}})),d=function(e){function t(e,r){var n;return Object(u.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e,r))).onStartNewGame=function(){n.props.onStartNewGame(n.state.selectedDifficulty)},n.onDifficultyChange=function(e){var t=null;if("random"===e.target.value)t=f.random;else if("hungry"===e.target.value)t=f.hungry;else{if("simple"!==e.target.value)throw new Error("Unknown difficulty");t=f.simple}n.setState({selectedDifficulty:t})},n.state={selectedDifficulty:n.props.difficulty},n}return Object(v.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"NewGame"},a.a.createElement("input",{type:"radio",id:"random",name:"difficulty",value:"random",checked:this.state.selectedDifficulty===f.random,onChange:this.onDifficultyChange}),a.a.createElement("input",{type:"radio",id:"hungry",name:"difficulty",value:"hungry",checked:this.state.selectedDifficulty===f.hungry,onChange:this.onDifficultyChange}),a.a.createElement("input",{type:"radio",id:"simple",name:"difficulty",value:"simple",checked:this.state.selectedDifficulty===f.simple,onChange:this.onDifficultyChange}),a.a.createElement("button",{onClick:this.onStartNewGame},"start new game"))}}]),t}(a.a.Component),m=(r(18),r(19),r(20),function(e){function t(e,r){return Object(u.a)(this,t),Object(c.a)(this,Object(l.a)(t).call(this,e,r))}return Object(v.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=1/this.props.ratio*100;return a.a.createElement("div",{className:"AspectRatioContainer",style:{paddingBottom:e.toString()+"%"}},a.a.createElement("div",{className:"AspectRatioInner"},this.props.children))}}]),t}(a.a.Component)),y=Object.freeze({empty:1,white:2,black:3}),p=function(e){function t(e,r){var n;return Object(u.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e,r))).onClick=function(){n.props.onClick(Object(h.a)(n))},n.onMouseEnter=function(){n.props.onMouseEnter(Object(h.a)(n))},n.onMouseLeave=function(){n.props.onMouseLeave(Object(h.a)(n))},n.state={piece:n.props.piece,move:n.props.move,toReverse:!1},n}return Object(v.a)(t,e),Object(s.a)(t,[{key:"setPiece",value:function(e){this.setState({piece:e})}},{key:"setMove",value:function(e){this.setState({move:e})}},{key:"setToReverse",value:function(e){this.setState({toReverse:e})}},{key:"render",value:function(){var e;e=this.state.piece===y.white?this.getPiece("white"):this.state.piece===y.black?this.getPiece("black"):"";var t=this.state.move?"blue":this.props.color;return t=this.state.toReverse?"aqua":t,a.a.createElement("div",{className:"SquareContainer"},a.a.createElement(m,{ratio:1,children:a.a.createElement("div",{className:"Square",style:{backgroundColor:t},onClick:this.onClick,onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave},e)}))}},{key:"getPiece",value:function(e){return a.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"Piece"},a.a.createElement("circle",{r:"50%",cx:"50%",cy:"50%",fill:e}))}}]),t}(a.a.Component),b=Object.freeze({white:{piece:y.white,name:"White Player"},black:{piece:y.black,name:"Black Player"}});var g=function(e){return e===b.white?b.black:b.white},w=function(){function e(){Object(u.a)(this,e),this.grid=[];for(var t=0;t<8;t++){for(var r=[],n=0;n<8;n++)r.push(y.empty);this.grid.push(r)}this.validMoves=null,this.currPlayer=b.white,this.moveNumber=1,this.winner=null}return Object(s.a)(e,[{key:"get",value:function(e,t){return this.grid[e][t]}},{key:"set",value:function(e,t){this.grid[e.rowIndex][e.columnIndex]=t,this.validMoves=null}},{key:"getMoveNumber",value:function(){return this.moveNumber}},{key:"makeMove",value:function(e){if(!this.isValidMove(e.rowIndex,e.columnIndex))throw new Error("The intended move is invalid");this.set(e,this.currPlayer.piece);var t=!0,r=!1,n=void 0;try{for(var a,i=e.toReverse[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var o=a.value;this.set(o,this.currPlayer.piece)}}catch(u){r=!0,n=u}finally{try{t||null==i.return||i.return()}finally{if(r)throw n}}this.currPlayer=g(this.currPlayer),this.getValidMoves().length>0?this.moveNumber++:this.winner=this.findWinner()}},{key:"findWinner",value:function(){for(var e=this.currPlayer,t=g(e),r=0,n=0,a=0;a<8;a++)for(var i=0;i<8;i++){var o=this.get(a,i);o===e.piece?r++:o===t.piece&&n++}return r>n?e:t}},{key:"undoMove",value:function(e){this.set(e,y.empty);var t=!0,r=!1,n=void 0;try{for(var a,i=e.toReverse[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var o=a.value;this.set(o,this.currPlayer.piece)}}catch(u){r=!0,n=u}finally{try{t||null==i.return||i.return()}finally{if(r)throw n}}this.currPlayer=g(this.currPlayer),this.winner=null,this.moveNumber--}},{key:"getValidMoves",value:function(){if(null===this.validMoves){if(!this.currPlayer)return[];for(var e=[],t=0;t<8;++t)for(var r=0;r<8;++r)if(this.grid[t][r]===y.empty){var n=this.getToReverse(this.currPlayer,t,r);n.length>0&&e.push({rowIndex:t,columnIndex:r,toReverse:n})}this.validMoves=e}return this.validMoves}},{key:"isValidMove",value:function(e,t){var r=this.getValidMoves(this.currPlayer),n=!0,a=!1,i=void 0;try{for(var o,u=r[Symbol.iterator]();!(n=(o=u.next()).done);n=!0){var s=o.value;if(s.rowIndex===e&&s.columnIndex===t)return!0}}catch(c){a=!0,i=c}finally{try{n||null==u.return||u.return()}finally{if(a)throw i}}return!1}},{key:"getMove",value:function(e,t){var r=this.getValidMoves(this.currPlayer),n=!0,a=!1,i=void 0;try{for(var o,u=r[Symbol.iterator]();!(n=(o=u.next()).done);n=!0){var s=o.value;if(s.rowIndex===e&&s.columnIndex===t)return s}}catch(c){a=!0,i=c}finally{try{n||null==u.return||u.return()}finally{if(a)throw i}}return!1}},{key:"getToReverse",value:function(e,t,r){for(var n=[],a=-1;a<=1;++a)for(var i=-1;i<=1;++i)0===a&&0===i||(n=n.concat(this.getToReverseInDirection(e,t,r,a,i)));return n}},{key:"getToReverseInDirection",value:function(e,t,r,n,a){for(var i=[],o=t,u=r;;){if(o+=n,u+=a,!this.isOnBoard(o,u))return[];var s=this.grid[o][u];if(s===y.empty)return[];if(s===e.piece)return i;i.push({rowIndex:o,columnIndex:u})}}},{key:"isOnBoard",value:function(e,t){return e>=0&&e<8&&t>=0&&t<8}}],[{key:"getDefaultInitBoard",value:function(){var t=new e;return t.grid[3][3]=y.black,t.grid[4][4]=y.black,t.grid[4][3]=y.white,t.grid[3][4]=y.white,t}}]),e}(),k=function(e){function t(e){return Object(u.a)(this,t),Object(c.a)(this,Object(l.a)(t).call(this,e))}return Object(v.a)(t,e),Object(s.a)(t,[{key:"evaluateBoard",value:function(e){for(var t=0,r=0;r<8;r++)for(var n=0;n<8;n++)e.get(r,n)===e.currPlayer.piece&&t++;return t}}]),t}(function(){function e(t){Object(u.a)(this,e),this.depth=t||4}return Object(s.a)(e,[{key:"nextMove",value:function(e){return this.negamax(e,this.depth,-1e8,1e8).move}},{key:"negamax",value:function(e,t,r,n){if(0===t||e.winner)return{val:this.evaluateBoard(e)};var a=e.getValidMoves(),i=-1e5,o=null,u=!0,s=!1,c=void 0;try{for(var l,v=a[Symbol.iterator]();!(u=(l=v.next()).done);u=!0){var h=l.value;e.makeMove(h);var f=this.negamax(e,t-1,r,n);if(f.val>i&&(i=f.val,o={val:f.val,move:h}),o&&o.val>r&&(r=o.val),r>=n)break;e.undoMove(h)}}catch(d){s=!0,c=d}finally{try{u||null==v.return||v.return()}finally{if(s)throw c}}return o}},{key:"evaluateBoard",value:function(e){throw new Error("You have to implement this function")}}]),e}()),O=function(e){function t(e,r){var n;return Object(u.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e,r))).makeMove=function(e){var t=n.board.getMove(e.props.rowIndex,e.props.columnIndex);if(t){if(n.board.makeMove(t),n.updateBoard(),n.board.winner)return void n.props.onGameOver({winner:n.board.winner});var r=n.actualPlayer.nextMove(n.board);n.board.makeMove(r),n.updateBoard(),n.board.winner&&n.props.onGameOver({winner:n.board.winner})}},n.onMouseEnterSquare=function(e){var t=e.state.move;if(t){var r=!0,a=!1,i=void 0;try{for(var o,u=t.toReverse[Symbol.iterator]();!(r=(o=u.next()).done);r=!0){var s=o.value;n.getSquare(s).setToReverse(!0)}}catch(c){a=!0,i=c}finally{try{r||null==u.return||u.return()}finally{if(a)throw i}}}},n.onMouseLeaveSquare=function(e){var t=e.state.move;if(t){var r=!0,a=!1,i=void 0;try{for(var o,u=t.toReverse[Symbol.iterator]();!(r=(o=u.next()).done);r=!0){var s=o.value;n.getSquare(s).setToReverse(!1)}}catch(c){a=!0,i=c}finally{try{r||null==u.return||u.return()}finally{if(a)throw i}}}},n.createRefs(),n.board=w.getDefaultInitBoard(),n.player=e.player,n.actualPlayer=new k(4),n}return Object(v.a)(t,e),Object(s.a)(t,[{key:"createRefs",value:function(){for(var e=[],t=0;t<8;t++){for(var r=[],n=0;n<8;n++)r.push(a.a.createRef());e.push(r)}this.squares=e}},{key:"updateBoard",value:function(){for(var e=0;e<8;e++)for(var t=0;t<8;t++){var r=this.board.getMove(e,t),n=this.squares[e][t].current;n.setMove(r),n.setPiece(this.board.get(e,t)),n.setToReverse(!1)}}},{key:"getSquare",value:function(e){return this.squares[e.rowIndex][e.columnIndex].current}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"board"},this.board.grid.map((function(t,r){return a.a.createElement("div",{className:"boardRow"},t.map((function(t,n){var i=e.board.getMove(r,n);return a.a.createElement(p,{rowIndex:r,columnIndex:n,ref:e.squares[r][n],color:"green",piece:e.board.get(r,n),move:i,onClick:e.makeMove,onMouseEnter:e.onMouseEnterSquare,onMouseLeave:e.onMouseLeaveSquare})})))})))}}]),t}(a.a.Component),j=function(e){function t(e,r){var n;return Object(u.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e,r))).onGameOver=function(e){alert(e.winner.name+" won!!!"),n.updateLocalStorage(e),n.setState({inGame:!1})},n.onStartNewGame=function(e){n.setState({inGame:!0,difficulty:e})},n.state={inGame:!1,player:b.white,difficulty:f.hungry,height:0,width:0},n.updateWindowDimensions=n.updateWindowDimensions.bind(Object(h.a)(n)),n}return Object(v.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.updateWindowDimensions(),window.addEventListener("resize",this.updateWindowDimensions)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWindowDimensions)}},{key:"updateWindowDimensions",value:function(){this.setState({width:.7*window.innerWidth,height:window.innerHeight})}},{key:"updateLocalStorage",value:function(e){var t=e.winner===this.state.player?1:0;localStorage.getItem("victories")||localStorage.setItem("victories",t.toString()),localStorage.setItem("victories",(Number(localStorage.getItem("victories"))+t).toString())}},{key:"render",value:function(){return a.a.createElement("div",{className:"GameSpace",style:{width:this.state.width,height:this.state.height}},a.a.createElement(m,{ratio:1},this.state.inGame?a.a.createElement(O,{player:this.state.player,onGameOver:this.onGameOver,difficulty:this.state.difficulty}):a.a.createElement(d,{onStartNewGame:this.onStartNewGame,difficulty:this.state.difficulty})))}}]),t}(a.a.Component),S=(r(21),function(e){function t(e,r){var n;return Object(u.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e,r))).state={victories:0},n.update(),n}return Object(v.a)(t,e),Object(s.a)(t,[{key:"update",value:function(){var e=localStorage.getItem("victories");e||(e=0),this.setState({victories:e})}},{key:"render",value:function(){return a.a.createElement("div",{className:"Stats"},a.a.createElement("p",null,"Stats"),a.a.createElement("p",null,"Won: ",this.state.victories))}}]),t}(a.a.Component)),M=function(e){function t(e,r,a){var i;return Object(u.a)(this,t),(i=Object(c.a)(this,Object(l.a)(t).call(this,e,r))).onStatsChanged=function(){i.stats.current.update()},i.stats=Object(n.createRef)(),i}return Object(v.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"AppRow"},a.a.createElement(j,{onStatsChanged:this.onStatsChanged}),a.a.createElement(S,{ref:this.stats}))}}]),t}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[9,1,2]]]);
//# sourceMappingURL=main.eb8b5376.chunk.js.map