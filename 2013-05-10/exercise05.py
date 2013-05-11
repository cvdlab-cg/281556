from pyplasm import *
import scipy
from scipy import *

#---------------------------------------------------------
def VERTEXTRUDE((V,coords)):
    """
        Utility function to generate the output model vertices in a 
        multiple extrusion of a LAR model.
        V is a list of d-vertices (each given as a list of d coordinates).
        coords is a list of absolute translation parameters to be applied to 
        V in order to generate the output vertices.
        
        Return a new list of (d+1)-vertices.
    """
    return CAT(AA(COMP([AA(AR),DISTR]))(DISTL([V,coords])))

def cumsum(iterable):
    # cumulative addition: list(cumsum(range(4))) => [0, 1, 3, 6]
    iterable = iter(iterable)
    s = iterable.next()
    yield s
    for c in iterable:
        s = s + c
        yield s

def larExtrude(model,pattern):
    V,FV = model
    d = len(FV[0])
    offset = len(V)
    m = len(pattern)
    outcells = []
    for cell in FV:
        # create the indices of vertices in the cell "tube"
        tube = [v + k*offset for k in range(m+1) for v in cell]
        # take groups of d+1 elements, via shifting by one
        rangelimit = len(tube)-d
        cellTube = [tube[k:k+d+1] for k in range(rangelimit)]
        outcells += [scipy.reshape(cellTube,newshape=(m,d,d+1)).tolist()]
    outcells = AA(CAT)(TRANS(outcells))
    outcells = [group for k,group in enumerate(outcells) if pattern[k]>0 ]
    coords = list(cumsum([0]+(AA(ABS)(pattern))))
    outVerts = VERTEXTRUDE((V,coords))
    newModel = outVerts, CAT(outcells)
    return newModel

def GRID(args):
    model = ([[]],[[0]])
    for k,steps in enumerate(args):
        model = larExtrude(model,steps*[1])
    V,cells = model
    verts = AA(list)(scipy.array(V) / AA(float)(args))
    return MKPOL([verts, AA(AA(lambda h:h+1))(cells), None])

#scocca laterale curve

domain=GRID([20])
domain2d=GRID([20,20])

#parte superiore scocca laterale

curvaAlta02= BEZIER(S1)([[31,1045,0],[120,920,0],[260,945,0]])
curvaAlta01= BEZIER(S1)([[20,1131,0],[31,1045,0]])
curvaAlta1= BEZIER(S1)([[20,1131,0],[180,1260,0],[617,1390,0]])
curvaAlta2= BEZIER(S1)([[617,1390,0],[890,1431,0],[1086,1400,0],[1360,1280,0]])
curvaAlta3= BEZIER(S1)([[1360,1280,0],[1740,1230,0],[2027,1083,0]])
curvaAlta4= BEZIER(S1)([[2027,1083,0],[2027,1031,0]])
curvaAlta5= BEZIER(S1)([[2027,1031,0],[2006,1020,0]])
curvaAlta6= BEZIER(S1)([[2006,1020,0],[2006,972,0],[1720,930,0]])

#curvature ruote

curvaRuota1= BEZIER(S1)([[1720,930,0],[1730,1000,0],[1724,1055,0],[1700,1106,0],[1665,1144,0],[1617,1172,0],[1585,1180,0],[1450,1145,0],[1400,1090,0],[1375,1000,0],[1372,940,0]])

#parte sotto scocca laterale

curvaAlta8= BEZIER(S1)([[1372,940,0],[607,942,0]])

#finestrino

curvaAlta9= BEZIER(S1)([[600,1340,0],[1030,1335,0],[1220,1265,0],[870,1100,0],[665,1000,0],[600,1340,0]])
#curvaAlta10= BEZIER(S1)([[,,0],[,,0],[,,0]])

#map con il dominio

curva02map = MAP(curvaAlta02)(domain)
curva01map = MAP(curvaAlta01)(domain)
curva1map = MAP(curvaAlta1)(domain)
curva2map = MAP(curvaAlta2)(domain)
curva3map = MAP(curvaAlta3)(domain)
curva4map = MAP(curvaAlta4)(domain)
curva5map = MAP(curvaAlta5)(domain)
curva6map = MAP(curvaAlta6)(domain)
curvaruotamap = MAP(curvaRuota1)(domain)
curvaruotamap2 = T([1,2])([607-1720,0])(curvaruotamap)
curva8map = MAP(curvaAlta8)(domain)
curva9map = MAP(curvaAlta9)(domain)


sagomaEsterna = STRUCT([curva02map,curva01map,curva1map,curva2map,curva3map,curva4map,curva5map,curva6map,curvaruotamap,curva8map,curvaruotamap2,curva9map])
sdoppiaSagoma = S([1,2])([-1])(sagomaEsterna)
ruotaSagoma= R([1,3])(PI)(sdoppiaSagoma)
traslaSagoma= T(3)(800)(ruotaSagoma)


scoccheEsterne= STRUCT([sagomaEsterna,traslaSagoma])

#VIEW(scoccheEsterne)


#scocca superiore

curvaDown= BEZIER(S1)([[35,0,450],[110,0,127],[280,0,42],[630,0,45],[742,0,56],[1366,0,59],[1725,0,59],[1725,0,59],[1914,0,118],[2007,0,303],[2040,0,450]])

#vetro avanti

curvaVetro= BEZIER(S1)([[1110,0,450],[1400,0,450]])
curvaVetro3= BEZIER(S1)([[1400,0,450],[1390,0,270],[1300,0,140]])
curvaVetro2= BEZIER(S1)([[1300,0,140],[1200,0,150],[1100,0,200],[1100,0,310],[1110,0,450]])

#vetro dietro

curvaVetroDietro= BEZIER(S1)([[390,0,650],[350,0,450],[390,0,250]])
curvaVetroDietro2= BEZIER(S1)([[390,0,250],[640,0,235]])
curvaVetroDietro3= BEZIER(S1)([[640,0,235],[630,0,450],[630,0,670]])
curvaVetroDietro4= BEZIER(S1)([[630,0,670],[390,0,650]])

#cofano

curvaVetroCofano= BEZIER(S1)([[1450,0,450],[1435,0,300],[1400,0,170],[1700,0,220],[1925,0,290],[1962,0,445]])


#map con il dominio

curvaDownmap= MAP(curvaDown)(domain)
curvaVetromap= MAP(curvaVetro)(domain)
curvaVetromap2= MAP(curvaVetro2)(domain)
curvaVetromap3= MAP(curvaVetro3)(domain)
curvaVdietromap= MAP(curvaVetroDietro)(domain)
curvaVdietromap2= MAP(curvaVetroDietro2)(domain)
curvaVdietromap3= MAP(curvaVetroDietro3)(domain)
curvaVdietromap4= MAP(curvaVetroDietro4)(domain)
curvaCofanomap= MAP(curvaVetroCofano)(domain)
#curvaVetroDietromap= MAP(curvaVetroDietro)(domain)

sdoppiaSup = S([1,3])([-1])(curvaDownmap)
ruotaSup1= R([2,3])(PI)(sdoppiaSup)
traslaSup= T(3)(900)(ruotaSup1)
ruotaSup2= R([1,2])(PI)(traslaSup)

vetroAvantitotale= STRUCT([curvaCofanomap,curvaVetromap,curvaVetromap2,curvaVetromap3])
vetroDietrototale= STRUCT([curvaVdietromap,curvaVdietromap2,curvaVdietromap3,curvaVdietromap4])

sdoppiaVetroDietro = S([1,3])([-1])(vetroAvantitotale)
ruotaVetroDietro= R([2,3])(PI)(sdoppiaVetroDietro)
traslaVetroDietro= T(3)(900)(ruotaVetroDietro)
ruotaVetroDietro2= R([1,2])(PI)(traslaVetroDietro)

scoccaSopraTotale = STRUCT([vetroAvantitotale,vetroDietrototale,ruotaVetroDietro2,curvaDownmap,ruotaSup2])
scoccaSopraTotaleT= T(2)(1400)(scoccaSopraTotale)
#muso davanti

scoccaDavanti = BEZIER(S1)([[0,96,1490],[0,76,1750],[0,131,1804],[0,218,1980],[0,476,2007],[0,735,1935],[0,815,1807],[0,873,1745],[0,855,1455],[0,96,1490]])


scoccaDavantiMap = MAP(scoccaDavanti)(domain)


#muso dietro


scoccaDietro = BEZIER(S1)([[0,940,104],[0,707,103],[0,705,150],[0,724,180],[0,733,180],[0,747,225],[0,900,222],[0,915,180],[0,930,180],[0,945,150],[0,940,104]])

scoccaDietroMap = MAP(scoccaDietro)(domain)
#scoccadietroScale = S([1,2,3])(0.5)(scoccaDietroMap)


#gommacompleta

celle=36
razzeru=10
raggiodiskfreno=30
altezzadiskfreno=5
raggiobig=160
raggioshort=70
#raggiotuboest=15
#altezzatuboest=(raggiobig-raggioshort)+((raggiobig-raggioshort)/(1.5))

razza=CYLINDER([(altezzadiskfreno*2),(raggioshort-raggiodiskfreno)])(celle)
razza=R([1,3])(-PI/2)(razza)
razza=T([1])(raggiodiskfreno)(razza)
razze=STRUCT(NN(razzeru)([razza,R([1,2])(2*PI/(razzeru))]))

torus=TORUS([raggioshort,raggiobig])([celle,celle])

diskfreno=CYLINDER([raggiodiskfreno,altezzadiskfreno])(celle)
diskfreno=T([3])(-(altezzadiskfreno/2))(diskfreno)

#tuboest=CYLINDER([raggiotuboest,altezzatuboest])(celle)
#tuboest=T([3])(-(altezzatuboest/2))(tuboest)


gommacompleta=STRUCT([torus,diskfreno,razze])
gommacompletaT=T([1,2])([450,1000])(gommacompleta)
gommacompleta2=T(1)(1100)(gommacompletaT)

gomme3=T([3])(800)(gommacompleta2)
gomme4=T([3])(800)(gommacompletaT)
gommeAll=STRUCT([gommacompleta2,gommacompletaT,gomme3,gomme4])


scoccheTotale= STRUCT([scoccaSopraTotaleT,gommeAll,scoccheEsterne,scoccaDavantiMap,scoccaDietroMap])



#razzamap4=T([,])([,])(razzamap)
#VOLANTE

latorazza1=BEZIER(S1)([[0,0,7],[3,0,-3]])
latorazza2=BEZIER(S1)([[2,0,8],[5,0,-2]])



razza1=BEZIER(S2)([latorazza2,latorazza1])

razzamap= MAP(razza1)(domain2d)
razzamap2=R([1,3])(PI/4)(razzamap)
#razzamap3=R([1,3])(PI/2)(razzamap2)



razze=STRUCT([razzamap,razzamap2])

VIEW(razze)


#SPECCHIETTO

punti1=[[0,0.5,0],[0.6,0.75,0],[1,0.5,0]]
punti2=[[0,0.5,0],[-0.12,-0.12,0],[+0.12,0.15,0],[0.6,-0.12,0],[1,0,0],[1,0.5,0]]
punti3z=[[0,0.5,0],[0.25,0.5,0.25],[0.5,0.5,0.5],[0.75,0.5,0.25],[1,0.5,0]]
punti4z=[[0,0.5,0],[0.25,0.42,0.25],[0.5,0.35,0.5],[0.75,0.42,0.25],[1,0.5,0]]

curva1=BEZIER(S1)(punti1)
curva2=BEZIER(S1)(punti2)
curva3z=BEZIER(S1)(punti3z)
curva4z=BEZIER(S1)(punti4z)

mapp=BEZIER(S2)([curva1,curva2])
mappz=BEZIER(S2)([curva1,curva3z,curva4z,curva2])

vetrospecchietto=MAP(mapp)(domain2d)
specchietto=MAP(mappz)(domain2d)

spechietto=T([1])([0.12])(specchietto)


specchiompleto=STRUCT([vetrospecchietto,specchietto])
specchiompleto=R([2,3])(PI/2)(specchiompleto)

#marmitta macchina

def mufflerCar (radius,length):

    def circle (r) :
        def mapping (p) :
            alpha,r = p
            return [r*COS(alpha), r*SIN(alpha)]

        dom2D = PROD([INTERVALS(2*PI)(360), INTERVALS(r)(1)])
        return MAP(mapping)(dom2D)

    dom2Dcircle = PROD([INTERVALS(1)(30),INTERVALS(2*PI)(72)])
    controlPoints = [[radius,0,0],[radius,0,length]]
    mufflerFunction = BEZIER(S1)(controlPoints)
    lowerBase = circle(radius)
    muffler = MAP(ROTATIONALSURFACE(mufflerFunction))(dom2Dcircle)
    muffler = STRUCT([lowerBase,muffler])
    muffler = COLOR([0.78,0.78,0.78])(muffler)

    # marmitta doppia
    #muffler = T(1)(radius)(muffler)
    #muffler2 = S(1)(-1)(muffler)
    #muffler = STRUCT([muffler,muffler2])
    #muffler = R([1,2])(-PI/2)(muffler)

    muffler = R([1,3])(-PI/2)(muffler)

    return muffler

macchinacompleta=STRUCT([scoccheTotale,specchiompleto])

VIEW(macchinacompleta)
