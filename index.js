var canvas = document.getElementById("renderCanvas");
var skullBut = document.getElementById('skull');
var bomBoxBut = document.getElementById('bomBox');
var barrelBut = document.getElementById('barrel');
var loading = document.getElementById('loading');

setTimeout(function () {
    loading.style.display = "none";
  }, 2500);

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
const createScene =  () => {
const scene = new BABYLON.Scene(engine);

/**** Set camera and light *****/

const camera = new BABYLON.ArcRotateCamera("camera", 4.72, 1.6, 0, new BABYLON.Vector3(0, 0, -550));
camera.attachControl(canvas, true);
//denie scroll
// camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius = 0; 

//set lights
//default room color
var roomColor = new BABYLON.Color3(0.4, 0.4, 0.4);

const light2 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 1));
light2.intensity = 0.7;
light2.diffuse = roomColor;
const light4 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 1));
light4.intensity = 0.2;
const light3 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-1, -1, -1));
light3.intensity = 0.7;
light3.diffuse = roomColor;
const light5 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-1, -1, -1));
light5.intensity = 0.2;

//room lights to change
var roomColors = [
   /* normalRoom */ new BABYLON.Color3(0.4, 0.4, 0.4),
  /*  purpleRoom */ new BABYLON.Color3(0.4, 0.0, 0.4),
  /*  greenRoom */ new BABYLON.Color3(0.0, 0.4, 0.0),
  /*  redRoom */ new BABYLON.Color3(0.4, 0.0, 0.0),
  /*  yellowRoom */ new BABYLON.Color3(0.4, 0.4, 0.0)
];
// function to change lights on click
var t = 0;
var changeLightColor = function(meshEvent) {
var pickedMesh = meshEvent.meshUnderPointer; 
if(t < 4){t += 1}else{t=0};
                
light2.diffuse = roomColors[t];
light3.diffuse = roomColors[t];
}

//set faces for room
var columns = 6;  // 6 columns
var rows = 1;  // 1 row


var faceUV = new Array(6);

//set all faces to same
for (var i = 0; i < 6; i++) {
faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
}

//create room
var room = BABYLON.MeshBuilder.CreateBox("room", {width: 700, height: 500, depth: 1200, faceUV: faceUV}, scene);
roomMaterial = new BABYLON.StandardMaterial("roomMaterial", scene);
roomMaterial.diffuseTexture = new BABYLON.Texture("room1.jpg", scene);
roomMaterial.backFaceCulling = false;	
room.material = roomMaterial;

//defaut light shape
var lightShape = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 30});

lightShape.material = new BABYLON.StandardMaterial("lightShapeMat", scene);
lightShape.material.emissiveColor = roomColor;
lightShape.position = new BABYLON.Vector3(0, 240, 60);
// lightShape.dispose;
    // scene.removeMesh(lightShape);
// var lopta = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 30});
// lopta.position.y = 50;
// lopta.visibility = 0;


// let imgClass = document.getElementsByClassName('img');
var models = ["skull.glb", "bomBox.glb", "scullAndBomBox.glb"];
// for (let i = 0; i < imgClass.length; i++) {
//     imgClass[i].addEventListener("click", () =>{
//         var model = models[i];
//     })
// }
// var model = "skull.glb";
var m = 0;
var changeModel = function(meshEvent) {
    
// var pickedMesh = meshEvent.meshUnderPointer; 
if(m < 2){m += 1}else{m=0};
                
// model = models[m];

console.log(m);


}
// var aaa = BABYLON.SceneLoader.ImportMesh("", "", "bomBox.glb", scene, function (newMeshes) {
//     var bomBox = newMeshes[0];
//     bomBox.position = new BABYLON.Vector3(0, 0, 0);
//     // skull.scaling = new BABYLON.Vector3(500, 500, 500);
//     // Set the target of the camera to the first imported mesh
//     camera.target = newMeshes[0];
//     bomBox.dispose();

//     BABYLON.SceneLoader.ImportMesh("", "", "skull.glb", scene, function (newMeshes) {
//         var skull = newMeshes[0];
//         skull.position = new BABYLON.Vector3(0, 0, 0);
//         // skull.scaling = new BABYLON.Vector3(500, 500, 500);
//         // Set the target of the camera to the first imported mesh
//         camera.target = newMeshes[0];
//         // modelShow.dispose();
//     });
// });

var skull;
var bomBox;
var barrel;

BABYLON.SceneLoader.ImportMesh("", "", "skull.glb", scene, function (newMeshes) {
    // Set the target of the camera to the first imported mesh
    camera.target = newMeshes[0];
    skull = newMeshes[0];
});

BABYLON.SceneLoader.ImportMesh("", "", "bomBox.glb", scene, function (newMeshes) {
    // Set the target of the camera to the first imported mesh
    camera.target = newMeshes[0];
    bomBox = newMeshes[0];
    bomBox.dispose();
});

BABYLON.SceneLoader.ImportMesh("", "", "barrel.glb", scene, function (newMeshes) {
    // Set the target of the camera to the first imported mesh
    camera.target = newMeshes[0];
    barrel = newMeshes[0];
    barrel.dispose();
});

skullBut.addEventListener("click", 
        function () {
            // alert("ok");
              //I want to delete the skull or make it invisible and import another mesh
              skull.dispose();
            bomBox.dispose();
            barrel.dispose();
              BABYLON.SceneLoader.ImportMesh("", "", "skull.glb", scene, function (newMeshes) {
            // Set the target of the camera to the first imported mesh
            camera.target = newMeshes[0];
            skull = newMeshes[0];
        });
});

bomBoxBut.addEventListener("click", 
        function () {
            // alert("ok");
              //I want to delete the skull or make it invisible and import another mesh
              skull.dispose();
              bomBox.dispose();
              barrel.dispose();
              BABYLON.SceneLoader.ImportMesh("", "", "bomBox.glb", scene, function (newMeshes) {
            // Set the target of the camera to the first imported mesh
            camera.target = newMeshes[0];
            bomBox = newMeshes[0];
        });
});

barrelBut.addEventListener("click", 
        function () {
            // alert("ok");
              //I want to delete the skull or make it invisible and import another mesh
              skull.dispose();
              bomBox.dispose();
              barrel.dispose();
              BABYLON.SceneLoader.ImportMesh("", "", "barrel.glb", scene, function (newMeshes) {
            // Set the target of the camera to the first imported mesh
            camera.target = newMeshes[0];
            barrel = newMeshes[0];
        });
});


//light rays from source
var lightRays = new BABYLON.VolumetricLightScatteringPostProcess('lightRays', 1.0, camera, lightShape, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
lightRays._volumetricLightScatteringRTT.renderParticles = true;
// lightRays.exposure = 0.2;
// lightRays.decay = 0.5;
lightRays.weight = 0.7;
lightRays.density = 0.5;
//lightRays.useDiffuseColor = true; // False as default
//lightRays.mesh.material.diffuseColor = new BABYLON.Color3(0.0, 1.0, 0.0);

//execute change on click
room.actionManager = new BABYLON.ActionManager(scene);
room.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, changeLightColor),
    // new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, changeModel)
);
// room.actionManager = new BABYLON.ActionManager(scene);
// room.actionManager.registerAction(
//     new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, changeModel)
// );
return scene;
}
        




//nesto sto bilo vec kad sam skinuo kod
        var engine;
        var scene;
        initFunction = async function() {               
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
scene = createScene();};
initFunction().then(() => {sceneToRender = scene        
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});