var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
const createScene =  () => {
const scene = new BABYLON.Scene(engine);

/**** Set camera and light *****/
var roomColor = new BABYLON.Color3(0.4, 0.4, 0.4);
const camera = new BABYLON.ArcRotateCamera("camera", 4.72, 1.6, 0, new BABYLON.Vector3(0, 0, -550));
camera.attachControl(canvas, true);
camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius = 0; 
// camera.rotation.x = 0;
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
// var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 0, 0), scene);
// light.diffuse = lightColor;
// light.specular = lightColor;
// light.intensity = 0;
// var light4 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 0, 0), scene);
// light4.diffuse = lightColor2;
// light4.specular = lightColor2;
// light4.intensity = 10;

var roomColors = [
    normalRoom = new BABYLON.Color3(0.4, 0.4, 0.4),
    purpleRoom = new BABYLON.Color3(0.4, 0.0, 0.4),
    greenRoom = new BABYLON.Color3(0.0, 0.4, 0.0),
    redRoom = new BABYLON.Color3(0.4, 0.0, 0.0),
    yellowRoom = new BABYLON.Color3(0.4, 0.4, 0.0)
];
var t = 0;
var changeLightColor = function(meshEvent) {
var pickedMesh = meshEvent.meshUnderPointer; 
if(t < 4){t += 1}else{t=0};
                
light2.diffuse = roomColors[t];
light3.diffuse = roomColors[t];
}


//const aaa = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height: 0.2, depth: 3});

//var vls = new BABYLON.VolumetricLightScatteringPostProcess('vls', 1.0, camera, aaa, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);

//     var defaultMesh = BABYLON.VolumetricLightScatteringPostProcess.CreateDefaultMesh("meshName", scene);
//     var vls = new BABYLON.VolumetricLightScatteringPostProcess('vls', 1.0, camera, defaultMesh, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
//     var mesh = vls.mesh;
//     vls.exposure = 0;

// vls.useDiffuseColor = true; // False as default
// vls.mesh.material.diffuseColor = new BABYLON.Color3(0.0, 1.0, 0.0);

var columns = 6;  // 6 columns
var rows = 1;  // 1 row

//alien sprite
var faceUV = new Array(6);

//set all faces to same
for (var i = 0; i < 6; i++) {
faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
}


var room = BABYLON.MeshBuilder.CreateBox("room", {width: 700, height: 500, depth: 1200, faceUV: faceUV}, scene);
roomMaterial = new BABYLON.StandardMaterial("roomMaterial", scene);
roomMaterial.diffuseTexture = new BABYLON.Texture("room1.jpg", scene);
roomMaterial.backFaceCulling = false;
// room.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
room.diffuseColor = new BABYLON.Color3(0, 0, 0);
room.specularColor = new BABYLON.Color3(0, 0, 0);
// room.alpha = 1;	
room.material = roomMaterial;


var rad1 = BABYLON.MeshBuilder.CreateBox("rad1", {width: 50, height: 10, depth: 150});

// var rad1 = BABYLON.Mesh.CreateSphere("rad1", 8, 16, scene);
// var rad1 = BABYLON.Mesh.CreateCylinder("rad1", 10, 5, 5, 8, 8, scene);
//rad1.visibility = 1;

rad1.material = new BABYLON.StandardMaterial("bmat", scene);
//rad1.material.diffuseColor = new BABYLON.Color3(0.0, 0.0, 0.0);
// rad1.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
rad1.material.emissiveColor = roomColor;
//rad1.material.backFaceCulling = false;

//rad1.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

rad1.position = new BABYLON.Vector3(0, 150, 0);
//rad1.position = newMesh.position;
// rad1.scalingDeterminant *= 2;

var godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, rad1, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);

godrays._volumetricLightScatteringRTT.renderParticles = true;

// godrays.exposure = 0.2;
// godrays.decay = 0.5;
godrays.weight = 0.7;
godrays.density = 0.5;

//godrays.useDiffuseColor = true; // False as default
//godrays.mesh.material.diffuseColor = new BABYLON.Color3(0.0, 1.0, 0.0);

room.actionManager = new BABYLON.ActionManager(scene);
room.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, changeLightColor)
);
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