var METERS2DEGREES = 0.0000125; // DO NOT USE THIS VALUE FOR 
            // ANY REAL DATA, IT IS JUST A QUICK, SIMPLISTIC, PRETTY BAD
            // APPROXIMATION
        
        // huntington ave
        var objectPosition = [42.341856, -71.087960]; //[41.684792,-0.888989];
            
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
        
		// var jsonLoader = new THREE.JSONLoader();
  //       jsonLoader.load( "model3d/wheel.js", loadWheel );
        
		// function loadWheel(geometry, materials) {
		//     var mesh;
  //           mesh = new THREE.Mesh(geometry, 
  //                                     new THREE.MeshFaceMaterial(materials));
    
  //           meshPos =  latLon2ThreeMeters(objectPosition[0], objectPosition[1]);                         
                                                  
  //           mesh.geometry.computeBoundingBox();
  //           var xsize = mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x;
  //           var ysize = mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;
  //           var zsize = mesh.geometry.boundingBox.max.z - mesh.geometry.boundingBox.min.z;
  //           // Sizes in meters
  //           var desiredXSize = 10; 
  //           var desiredYSize = 30; 
  //           var desiredZSize = 30; 
            
  //           mesh.scale.x = desiredXSize / xsize;
  //           mesh.scale.y = desiredYSize / ysize;
  //           mesh.scale.z = desiredZSize / zsize;
            
  //           mesh.position.x = meshPos.x;
  //           mesh.position.y = meshPos.y - 2; // the parking lot is sligthly under the street level
  //           mesh.position.z = meshPos.z;
            
  //           mesh.rotation.y = Math.PI/2;

  //           // For shadows (given the right ligths, and that renderer enables them)
  //           mesh.castShadow = true;
  //           mesh.receiveShadow = true;
            
  //           var streetViewOverlay = StreetViewOverlay();
  //            // 41.684196,-0.888992 is a street close to the parking lot behind Ada Byron building
  //           streetViewOverlay.load({streetView: true, objects3D: true, webGL:true}, mesh, 42.363115, -71.087674);           
  //       }


            // collada
            var loader = new THREE.ColladaLoader();
            loader.load('model3d/block.dae', loadWheel);

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
                //                           new THREE.MeshFaceMaterial(materials));
        
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
                geometry.scene.rotation.z =0.4;
                geometry.scene.rotation.x = -Math.PI/2;

                // move downwards
                geometry.scene.position.y = geometry.scene.position.y - 2
                
                var streetViewOverlay = StreetViewOverlay();
                 // 41.684196,-0.888992 is a street close to the parking lot behind Ada Byron building
                streetViewOverlay.load({streetView: true, objects3D: true, webGL:true}, geometry.scene, 42.341855, -71.087904);           
            }