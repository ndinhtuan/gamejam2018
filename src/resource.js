var res = {
    HelloWorld_png: "res/HelloWorld.png",
    Body_png: "res/rect.png",
    Ground_png: "Art_component/ground.png",
    Gun_png: "Art_component/cannon.png",
    Carrier_png: "Art_component/Carrier.png",
    Ball_png: "Art_component/cannonball.png",
    Slide_png: "Art_component/slider.png",
    Border_png: "Art_component/Borders.png",
    GameOver_png: "Art_component/Gameover.png",
    GameOverBg_png: "Art_component/GameOverBackGround.png"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}