AFRAME.registerComponent("bullets",{
    init: function() {
        this.shootBullet();
    },
    shootBullet: function(){
        window.addEventListener("click",(e)=>{
            var bullet = document.createElement("a-entity");
            bullet.setAttribute("geometry",{
                primitive:"sphere",
                radius: 0.1
            })
            bullet.setAttribute("material",{
                color: "black"
            })
            var cam = document.querySelector("#camera");
            var camera = document.querySelector("#camera").object3D;
            var direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
            var pos = cam.getAttribute("position");
            bullet.setAttribute("position", pos);
            bullet.setAttribute("velocity", direction.multiplyScalar(-15));
            bullet.setAttribute("dynamic-body",{
                mass:1,
                shape: "sphere"
            })

            
       
            var scene = document.querySelector("#scene");
            scene.appendChild(bullet);
            bullet.addEventListener("collide",this.removeBullet)
        })
    },
    removeBullet: function(event){
        
        var element= event.detail.target.el;
        var elementHit = event.detail.body.el;
        console.log(element,elementHit);


        var scene = document.querySelector("#scene");
        //alert(scene)
        scene.removeChild(element);
        
    }
})