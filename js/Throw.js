AFRAME.registerComponent("balls",{
    init: function() {
        this.shootBall();
    },
    shootBall: function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "e"){
                var ball = document.createElement("a-entity");
                ball.setAttribute("geometry",{
                    primitive:"sphere",
                    radius: 0.3
                })
                ball.setAttribute("material",{
                    color: "black"
                })
                var cam = document.querySelector( "#camera");
                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);
                var pos = cam.getAttribute("position");
                ball.setAttribute("position", pos);
                ball.setAttribute("velocity", direction.multiplyScalar(-10));
                ball.setAttribute("dynamic-body",{
                    mass:0,
                    shape: "sphere"
                })
        
                var scene = document.querySelector("#scene");
                scene.appendChild(ball);
                ball.addEventListener("collide",this.removeBall)
            }
        })
    },
    removeBall: function(event){
        var element= event.detail.target.el;
        var elementHit = event.detail.body.el;
        if (elementHit.id.includes("box")) {
            var impulse = new CANNON.Vec3(-2,2,1)
            var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"))

            elementHit.body.applyImpulse(impulse,worldPoint)
            element.removeEventListener("collide", this.shoot);

            var scene = document.querySelector("#scene");
            scene.removeChild(element); 
        }
        
        
    }
})