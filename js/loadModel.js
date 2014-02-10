var METERS2DEGREES = 0.0000125; // DO NOT USE THIS VALUE FOR
// ANY REAL DATA, IT IS JUST A QUICK, SIMPLISTIC, PRETTY BAD
// APPROXIMATION

// huntington ave
//[41.684792,-0.888989];

// Stephen St
// var objectPosition = [42.341856, -71.087960];

// Hayward parking lot
var objectPosition = [42.361540, -71.084376];
var PANO_HEAD = 30;

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
loader.load('model3d/college/ust_archi_r5.dae', loadWheel);

// OBJ
// var manager = new THREE.LoadingManager();
// manager.onProgress = function ( item, loaded, total ) {
//   console.log( item, loaded, total );
// };
// var loader = new THREE.ObjectLoader(manager);
// loader.load('model3d/block.obj', loadWheel);

function loadWheel(geometry, materials) {
    // var mesh;
    // mesh = new THREE.Mesh(geometry,
    // new THREE.MeshFaceMaterial(materials));

    // meshPos =  latLon2ThreeMeters(objectPosition[0], objectPosition[1]);

    // mesh.geometry.computeBoundingBox();
    // var xsize = mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x;
    // var ysize = mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;
    // var zsize = mesh.geometry.boundingBox.max.z - mesh.geometry.boundingBox.min.z;

    // Sizes in meters
    // var desiredXSize = 10;
    // var desiredYSize = 30;
    // var desiredZSize = 30;

    // mesh.scale.x = desiredXSize / xsize;
    // mesh.scale.y = desiredYSize / ysize;
    // mesh.scale.z = desiredZSize / zsize;

    // mesh.position.x = meshPos.x;
    // mesh.position.y = meshPos.y - 2; // the parking lot is sligthly under the street level
    // mesh.position.z = meshPos.z;

    // mesh.rotation.y = Math.PI/2;

    // // For shadows (given the right lights, and that renderer enables them)
    // mesh.castShadow = true;
    // mesh.receiveShadow = true;

    // geometry.scene.rotation.y = Math.PI/2;
    // geometry.scene.rotation.x = Math.PI/2;

    // rotate
    geometry.scene.rotation.z = 0.55;
    geometry.scene.rotation.x = -Math.PI/2;

    // move downwards (and back)
    geometry.scene.position.y = geometry.scene.position.y - 4
    geometry.scene.position.x = geometry.scene.position.x + 10

    // scale
    geometry.scene.scale.x = 0.04 // console log shows this value to be 0.0254 initially. How is this set?
    geometry.scene.scale.y = 0.04
    geometry.scene.scale.z = 0.04


    var streetViewOverlay = StreetViewOverlay();
    streetViewOverlay.load({streetView: true, objects3D: true, webGL:true}, geometry.scene, 42.361709, -71.085288); //  | 42.361630, -71.085268
}