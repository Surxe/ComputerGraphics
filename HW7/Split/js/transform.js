class Transform {
    constructor() {
        this.forward = [0,0,1];
        this.right = [1,0,0];
        this.up = [0,1,0];
    }

    rotate(degrees) {
        this.x_rotation = [
                    [1,0,0,0],
                    [0,Math.cos(degrees[0]),-1*Math.sin(degrees[0]),0],
                    [0,Math.sin(degrees[0]),Math.cos(degrees[0]),0],
                    [0,0,0,1]
                ];		
        this.y_rotation = [
                [Math.cos(degrees[1]),0,Math.sin(degrees[1]),0],
                [0,1,0,0],
                [-1*Math.sin(degrees[1]),0,Math.cos(degrees[1]),0],
                [0,0,0,1]	
                ];
        this.z_rotation = [
                    [Math.cos(degrees[2]),-1*Math.sin(degrees[2]),0,0],
                    [Math.sin(degrees[2]),Math.cos(degrees[2]),0,0],
                    [0,0,1,0],
                    [0,0,0,1]
                ]
        //this.forward = this.cross_multiply(x_rotation,[0,0,1,0]);		
        this.forward = this.cross_multiply(this.z_rotation,this.cross_multiply(this.y_rotation,this.cross_multiply(this.x_rotation,[0,0,1,0])))
        this.right = this.cross_multiply(this.z_rotation,this.cross_multiply(this.y_rotation,this.cross_multiply(this.x_rotation,[1,0,0,0])))
        this.up = this.cross_multiply(this.z_rotation,this.cross_multiply(this.y_rotation,this.cross_multiply(this.x_rotation,[0,1,0,0])))
    }		
    	
    cross_multiply(M,V) {
        console.log(M[0][3]);
        console.log(V[3]);
        var temp = [
                    M[0][0]*V[0]+M[0][1]*V[1]+M[0][2] * V[2]+ M[0][3]*V[3],
                    M[1][0]*V[0]+M[1][1]*V[1]+M[1][2] * V[2]+ M[1][3]*V[3],
                    M[2][0]*V[0]+M[2][1]*V[1]+M[2][2] * V[2]+ M[2][3]*V[3],
                    M[3][0]*V[0]+M[3][1]*V[1]+M[3][2] * V[2]+ M[3][3]*V[3]
                    ]
        console.log(temp);
        return temp;
    }
    
}