// HAYWARD parking lot

// demo 1
// @42.36465,-71.102468,3a,75y,267.5h,88.59t/data=!3m4!1e1!3m2!1sMonhRAl9yN44HedMpK81aQ!2e0?hl=en
var objectPosition = [  42.364398, -71.103438],
VIEWER_POSITION = [42.36465, -71.102468],
PANO_HEAD = 267.5,
PANO_PITCH = 3,
BUILDING_3D = 'model3d/metropcs/block_outline_tall.dae',
SCENE_POSITION = [-60, -9.5, -1],
SCENE_ROTATION = [-Math.PI/2, 0, 0.4],
LIGHT_POSITION = [ 400, 400, -200],
SCALE = [0.04, 0.045, 0.075],
OPACITY = 0.75;


// Translates degrees to meters. It is just a hack, not a proper projection.
// originLat and originLon should be the "center" of our area of interest or
// close to it
function hackMapProjection(lat, lon, originLat, originLon) {
    var lonCorrection = 1;
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
    // -7915118.7, 5215761.9
    // -71.102721,42.364666
    console.log(coordinates.x, -coordinates.y)
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
    geometry.scene.rotation.x = SCENE_ROTATION[0];
    geometry.scene.rotation.z = SCENE_ROTATION[2];

    // move downwards (and back)
    geometry.scene.position.x = geometry.scene.position.x + SCENE_POSITION[0];
    geometry.scene.position.y = geometry.scene.position.y + SCENE_POSITION[1];
    geometry.scene.position.z = geometry.scene.position.z + SCENE_POSITION[2];

    // scale
    // console log shows this value to be 0.0254 initially. How is this set?
    geometry.scene.scale.x = SCALE[0];
    geometry.scene.scale.y = SCALE[1];
    geometry.scene.scale.z = SCALE[2];

    var streetViewOverlay = StreetViewOverlay();
    streetViewOverlay.load({streetView: true, objects3D: true, webGL:true}, geometry.scene, VIEWER_POSITION[0], VIEWER_POSITION[1]);
}