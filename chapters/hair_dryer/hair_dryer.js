// Model of a hair dryer, loosely based on Braun model from 70'
// ============================================================

// parameters
let fanRadius       = 30;
let fanThickness    = 30;
let fanCutoutRadius = 20;
let fanCutoutDepth  = 5 ;
let fanRounding     = 10;
let lidRadius       = 19;
let lidThickness    = 3;
let lidRounding     = 2;

// fanhousing
let fanhousing = Cylinder(fanRadius,fanThickness)
fanhousing = FilletEdges(fanhousing,fanRounding,[0,2],false);
let cutout = Translate([0,0,fanThickness-fanCutoutDepth],Cylinder(fanCutoutRadius,fanCutoutDepth+10));
fanhousing = Difference(fanhousing,[cutout],false);
let fanhousing_inner = Offset(fanhousing,-1.5,0.01,true);

// lid on cutout /airintake
// let lid = Translate([0,0,fanThickness-lidThickness],Cylinder(lidRadius,lidThickness))
// lid = FilletEdges(lid,lidRounding,[0]);

// outlet
let outlet = Translate([-2,0,6], Box(30,60,18) )
outlet = FilletEdges(outlet,5,[1,3,5,7]);
let outlet_inner = Offset(outlet, -1.5, 0.01, true)
outlet_in = Translate([0,3,0],outlet_inner)

// handle
let handle = Translate([0,-30,7],Box(-80,25,16))
handle = FilletEdges(handle,5,[11,10,9,8,]);
button_cut = Translate([-50,-10,10],Box(10,20,10))
button_cut= FilletEdges(button_cut,2,[1,5,7,3])

// buttons
let button = Translate([-49,-10,11],Box(3,6,8))
button = FilletEdges(button,1.4,[1,3,5,7]);
button2 = Translate([5,0,0],button,true);
handle = Difference(handle,[button_cut]);

let handle_inner = Offset(handle,-1,0.01,true)

// creating hollow shape
let dryer_solid = Union([fanhousing,outlet,handle],false);
// dryer_solid = RemoveInternalEdges(dryer_solid);
dryer_solid = FilletEdges(dryer_solid,5,[49]);
dryer_solid = FilletEdges(dryer_solid,2,[39]);
dryer_solid = FilletEdges(dryer_solid,2,[70]);

dryer_inner = Union([fanhousing_inner,outlet_in,handle_inner])
dryer_hollow = Difference(dryer_solid,[dryer_inner])

// vanes
let vane = Translate([2,46,7.5],Box(1,15,15))
vane = ChamferEdges(vane,2,[10,11],false)
let vanes = []
for (j=0;j<=3;j++)
{
    vanes[j] = Translate([5*(j+1),0,0],vane,true)
}

// creating a cut-away
cutter = Translate([-100,-75,15],Box(150,150,25))
cutaway = Difference(dryer_hollow,[cutter]);
