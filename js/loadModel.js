// HAYWARD parking lot

// demo 1
// var objectPosition = [42.361540, -71.084376],
// VIEWER_POSITION = [42.361709, -71.085288],
// PANO_HEAD = 90,
// PANO_PITCH = 3,
// BUILDING_3D = 'model3d/college/ust_archi_r5.dae',
// SCENE_POSITION = [10, -6, 0],
// SCALE = 0.05;

// demo 2
// @42.361252,-71.085312,3a,75y,35.96h,81.04t/data=!3m4!1e1!3m2!1sipTwy-od_1EBdTnweYjMHg!2e0?hl=en
// 42.361342,-71.085301,3a,75y,35.96h,83.57t
var objectPosition = [42.361540, -71.084376],
VIEWER_POSITION = [42.361342, -71.085301],
PANO_HEAD = 35.96,
PANO_PITCH = 3,
BUILDING_3D = 'model3d/college/ust_archi_r5.dae',
SCENE_POSITION = [10, -6, 0],
SCALE = 0.05;




var METERS2DEGREES = 0.0000125; // DO NOT USE THIS VALUE FOR
// ANY REAL DATA, IT IS JUST A QUICK, SIMPLISTIC, PRETTY BAD
// APPROXIMATION

// Translates degrees to meters. It is just a hack, not a proper projection.
// originLat and originLon should be the "center" of our area of interest or
// close to it
function hackMapProjection(lat, lon, originLat, originLon) {
    var lonCorrection = 1.5;
    var rMajor = 6378137.0;

    function lonToX(lon) {
        return rMajor * (lon * Math.PI / 180);
    }

    function latToY(lat) {
        if (lat === 0) {
            return 0;
        } else {
            return rMajor * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI / 180) / 2));
        }
    }

    var x = lonToX(lon - originLon) / lonCorrection;
    var y = latToY(lat - originLat);
    return {'x': x, 'y': y};
}

// Origin is the position of our 3d object
function latLon2ThreeMeters(lat, lon) {
    var coordinates = hackMapProjection(lat, lon, objectPosition[0], objectPosition[1]);
    return {'x': coordinates.x, 'y': 0, 'z': -coordinates.y};
}

// collada
var loader = new THREE.ColladaLoader();
loader.load(BUILDING_3D, loadBuilding);

// OBJ
// var manager = new THREE.LoadingManager();
// manager.onProgress = function ( item, loaded, total ) {
//   console.log( item, loaded, total );
// };
// var loader = new THREE.ObjectLoader(manager);
// loader.load('model3d/block.obj', loadWheel);

function loadBuilding(geometry, materials) {

    // rotate
    geometry.scene.rotation.z = 0.55;
    geometry.scene.rotation.x = -Math.PI/2;

    // move downwards (and back)
    geometry.scene.position.x = geometry.scene.position.x + SCENE_POSITION[0];
    geometry.scene.position.y = geometry.scene.position.y + SCENE_POSITION[1];
    geometry.scene.position.z = geometry.scene.position.z + SCENE_POSITION[2];

    // scale
    // console log shows this value to be 0.0254 initially. How is this set?
    geometry.scene.scale.x = SCALE;
    geometry.scene.scale.y = SCALE;
    geometry.scene.scale.z = SCALE;

    var streetViewOverlay = StreetViewOverlay();
    streetViewOverlay.load({streetView: true, objects3D: true, webGL:true}, geometry.scene, VIEWER_POSITION[0], VIEWER_POSITION[1]);
}