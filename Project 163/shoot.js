AFRAME.registerComponent('paintball', {
    init: function(){
        this.paint();
    },

    paint: function(){
        window.addEventListener('keydown', (e) => {
           if(e.key === 'z'){
               var bullet = document.querySelector('a-entity');
               bullet.setAttribute('geometry', {
                   primitive: 'sphere',
                   radius: 0.1
               });

               bullet.setAttribute('material', 'color', 'blue');

               var cam = document.querySelector('#camera');
               pos = cam.getAttribute('position');

               bullet.setAttribute('position', {
                   x: posX,
                   y: posY,
                   z: posZ
               });

               var camera = document.querySelector('#camera').object3D;

               var direction = new THREE.Vector3();
               camera.getWorldDirection(direction);

               bullet.setAttribute("velocity", direction.multiplyScalar(-10));

               var scene = document.querySelector('#scene');

               bullet.setAttribute("dynamic-body", {
                   shape: "sphere",
                   mass: "0",
               });

               bullet.addEventListener("collide", this.removeBullet);

               scene.appendChild(bullet);

               this.shootSound();
            }
        });
    },

    removeBullet: function (e) {
        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;
    
        if (elementHit.id.includes('wall')) {
            var img = document.createElement('a-entity');
            img.setAttribute('material', {
                src: 'splash.png',
                repeat: '1 1 1'
            });
    
          //impulse and point vector
          var impulse = new CANNON.Vec3(-2, 2, 1);
          var worldPoint = new CANNON.Vec3().copy(
            elementHit.getAttribute("position")
          );
    
          elementHit.body.applyImpulse(impulse, worldPoint);
    
          element.removeEventListener("collide", this.removeBullet);
    
          var scene = document.querySelector("#scene");
          scene.removeChild(element);
        }
      },
      
      shootSound: function(){
        var entity = document.querySelector('#sound1');
        entity.components.sound.playSound()
      }
    });
