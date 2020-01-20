import * as THREE from 'three';

var camera: any, scene: any, renderer: any;
// don't run this until <div id="react-canvas"/> exists
setTimeout(() => {
  init();
  animate();
}, 10);

function getCanvasBoundingBox() {
  const canvas = document.getElementById('react-canvas')
  if (canvas) {
    return canvas.getBoundingClientRect();
  }
  return { width: 0, height: 0};
  
}

function init() {
  const bb = getCanvasBoundingBox();
  camera = new THREE.PerspectiveCamera( 45, bb.width / bb.height, 1, 2000 );
  camera.position.y = 400;

  scene = new THREE.Scene();

  var object;

  var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
  scene.add( ambientLight );

  var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
  camera.add( pointLight );
  scene.add( camera );

  var map = new THREE.TextureLoader().load( './textures/uv_grid_opengl.jpg' );
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 16;

  var material = new THREE.MeshPhongMaterial( { map: map, side: THREE.DoubleSide } );

  //

  object = new THREE.Mesh( new THREE.SphereBufferGeometry( 75, 20, 10 ), material );
  object.position.set( - 300, 0, 200 );
  scene.add( object );

  object = new THREE.Mesh( new THREE.IcosahedronBufferGeometry( 75, 1 ), material );
  object.position.set( - 100, 0, 200 );
  scene.add( object );

  object = new THREE.Mesh( new THREE.OctahedronBufferGeometry( 75, 2 ), material );
  object.position.set( 100, 0, 200 );
  scene.add( object );

  object = new THREE.Mesh( new THREE.TetrahedronBufferGeometry( 75, 0 ), material );
  object.position.set( 300, 0, 200 );
  scene.add( object );

  //

  object = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100, 4, 4 ), material );
  object.position.set( - 300, 0, 0 );
  scene.add( object );

  object = new THREE.Mesh( new THREE.BoxBufferGeometry( 100, 100, 100, 4, 4, 4 ), material );
  object.position.set( - 100, 0, 0 );
  scene.add( object );

  object = new THREE.Mesh( new THREE.CircleBufferGeometry( 50, 20, 0, Math.PI * 2 ), material );
  object.position.set( 100, 0, 0 );
  scene.add( object );

  object = new THREE.Mesh( new THREE.RingBufferGeometry( 10, 50, 20, 5, 0, Math.PI * 2 ), material );
  object.position.set( 300, 0, 0 );
  scene.add( object );

  //

  object = new THREE.Mesh( new THREE.CylinderBufferGeometry( 25, 75, 100, 40, 5 ), material );
  object.position.set( - 300, 0, - 200 );
  scene.add( object );

  var points = [];

  for ( var i = 0; i < 50; i ++ ) {

    points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * Math.sin( i * 0.1 ) * 15 + 50, ( i - 5 ) * 2 ) );

  }

  object = new THREE.Mesh( new THREE.LatheBufferGeometry( points, 20 ), material );
  object.position.set( - 100, 0, - 200 );
  scene.add( object );

  object = new THREE.Mesh( new THREE.TorusBufferGeometry( 50, 20, 20, 20 ), material );
  object.position.set( 100, 0, - 200 );
  scene.add( object );

  object = new THREE.Mesh( new THREE.TorusKnotBufferGeometry( 50, 10, 50, 20 ), material );
  object.position.set( 300, 0, - 200 );
  scene.add( object );

  //

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( bb.width, bb.height );
  const canvas = document.getElementById('react-canvas')
  if (canvas) {
    canvas.appendChild(renderer.domElement);
  }
  window.addEventListener( 'resize', onWindowResize, false );

}

export function onWindowResize() {
  if (camera && renderer) {
    const canvas = document.getElementById('react-canvas')
    if (canvas) {
      const boundingBox = canvas.getBoundingClientRect();
      camera.aspect = boundingBox.width / boundingBox.height;
      camera.updateProjectionMatrix();

      renderer.setSize( boundingBox.width, boundingBox.height );
    }
  }
}

//

function animate() {

  requestAnimationFrame( animate );

  render();

}

function render() {

  var timer = Date.now() * 0.0001;

  camera.position.x = Math.cos( timer ) * 800;
  camera.position.z = Math.sin( timer ) * 800;

  camera.lookAt( scene.position );

  scene.traverse( function ( object: any ) {

    if ( object.isMesh === true ) {

      object.rotation.x = timer * 5;
      object.rotation.y = timer * 2.5;

    }

  } );

  renderer.render( scene, camera );

}