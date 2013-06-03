!(function (exports){

  var fs = require('fs');

  var plasm_lib = require('plasm.js');
  var obj = plasm_lib.plasm;
  var fun = plasm_lib.plasm_fun;
  var plasm = obj.plasm;
  var Plasm = obj.Plasm;

  var root = this;

  Object.keys(fun).forEach(function (k) { 
    root[k] = fun[k];
  });

  var p = new Plasm();
  fun.PLASM(p);


  var scmodel = (function () {
  /*///////////////////////////////////////////
		//farfalla

		//DOMINI

		var domain1 = INTERVALS(1)(36);
		var domain2 = DOMAIN([[0,1],[0,1]])([36,36]);


		//antenne


		var puntiAntenna1=[[1.85,1.85,0],[2.22,2.28,0.3],[2.26,2.80,0]];
		var antenna1  = BEZIER(S0)(puntiAntenna1);
		var antenna1Map = MAP(antenna1)(domain1);


		//sferetta antenne


		var domainf=DOMAIN([[0,PI],[0,2*PI]])([24,144]); 
			var mappingsl=function(v){ 
			var a=v[0]; 
			var b=v[1]; 
			var u=1/8*SIN(a)*COS(b); 
			var v=1/8*SIN(a)*SIN(b); 
			var w=1/8*COS(a); 
		return[u,v,w];}; 
			var sferal=MAP(mappingsl)(domainf); 

			var sferaTcolor=COLOR([0,0,0])(T([0,1])([2.26,2.80])(sferal)); 

			var antennaCompleta1= STRUCT([antenna1Map,sferaTcolor]);

		//ali

		//ala alta

		var punti1=[[1.62,1.76,0],[1.86,2.54,0],[2.05,3.00,0],[1.40,3.60,0]];
		var punti2=[[1.40,3.60,0],[1.10,3.80,0],[1.13,3.51,0]];
		var punti5=[[1.13,3.51,0],[1.25,3.30,0],[1.08,3.31,0]];
		var punti3=[[1.08,3.31,0],[0.40,3.03,0],[0.67,2.43,0]];
		var punti4=[[0.67,2.43,0],[0.89,2.15,0],[1.10,1.98,0]];
		var punti6=[[1.10,1.98,0],[1.36,1.86,0],[1.62,1.76,0]];

		var alaAlta1 = BEZIER(S0)(punti1);
		var alaAlta2 = BEZIER(S0)(punti2);
		var alaAlta3 = BEZIER(S0)(punti3);
		var alaAlta4 = BEZIER(S0)(punti4);
		var alaAlta5 = BEZIER(S0)(punti5);
		var alaAlta6 = BEZIER(S0)(punti6);

		var alaAltaMap1 = MAP(alaAlta1)(domain1);
		var alaAltaMap2 = MAP(alaAlta2)(domain1);
		var alaAltaMap3 = MAP(alaAlta3)(domain1);
		var alaAltaMap4 = MAP(alaAlta4)(domain1);
		var alaAltaMap5 = MAP(alaAlta5)(domain1);
		var alaAltaMap6 = MAP(alaAlta6)(domain1);

		var alaAltaContorno = STRUCT([alaAltaMap1,alaAltaMap2,alaAltaMap3,alaAltaMap4,alaAltaMap5,alaAltaMap6]);


		/*var punti10=[[1.08,3.31,0],[1.40,2.95,0],[2.05,3.00,0]];
		var punti11=[[0.40,3.03,0],[1.30,2.38,0],[1.86,2.54,0]];
		var alaAlta6 = BEZIER(S0)(punti10);
		var alaAlta7 = BEZIER(S0)(punti11);*/

		var alaAltaSuperficie1 = BEZIER(S1)([alaAlta1,alaAlta3]);
		var alaAltaSuperficie2 = BEZIER(S1)([alaAlta2,alaAlta4]);
		var alaAltaSuperficie3 = BEZIER(S1)([alaAlta5,alaAlta6]);

		var alaMap1 = MAP(alaAltaSuperficie1)(domain2);
		var alaMap2 = MAP(alaAltaSuperficie2)(domain2);
		var alaMap3 = MAP(alaAltaSuperficie3)(domain2);

		var alaa = STRUCT([alaMap1,alaMap2,alaMap3]);



		//alabassa

		var punti6=[[0.67,2.43,0],[1.10,1.86,0],[1.62,1.76,0]];
		var punti7=[[1.62,1.76,0],[1.25,1.50,0],[0.93,1.43,0],[-1.20,1.99,0],[0.67,2.43,0]];

		var alaBassa6 = BEZIER(S0)(punti6);
		var alaBassa7 = BEZIER(S0)(punti7);

		var alaBassaMap6 = MAP(alaBassa6)(domain1);
		var alaBassaMap7 = MAP(alaBassa7)(domain1);

		var alaBassaContorno = STRUCT([alaBassaMap6,alaBassaMap7]);
		var alaCompletaContorno = STRUCT([alaBassaContorno,alaAltaContorno]);

		var alaBassaSuperficie = BEZIER(S1)([alaBassa6,alaBassa7]);
		var alab = MAP(alaBassaSuperficie)(domain2);


		//DRAW(alaCompletaContorno);
		//DRAW(alab);
		//DRAW(alaa);


		//parti interne ala alta

		//primo interno
		var puntia=[[1.5,2.65,0],[1.70,2.89,0],[1.70,3.14,0]];
		var puntia1=[[1.70,3.14,0],[1.59,3.35,0],[1.44,3.48,0]];
		var puntib=[[1.44,3.48,0],[1.35,3.34,0],[1.26,3.22,0]];
		var puntic=[[1.26,3.22,0],[1.39,3.00,0],[1.5,2.65,0]];

		var pa  = BEZIER(S0)(puntia);
		var pa1  = BEZIER(S0)(puntia1);
		var pb = BEZIER(S0)(puntib);
		var pc  = BEZIER(S0)(puntic);

		var pbez = BEZIER(S1)([pa,pb]);
		var pbezalfa = BEZIER(S1)([pa1,pc]);

		var psup1 = MAP(pbez)(domain2);
		var psup1b = MAP(pbezalfa)(domain2);

		var psupPrimoTotale = STRUCT([psup1,psup1b]);

		var primoUpColor = COLOR([2.25,0,2.55])(psupPrimoTotale);


		//primo contorno

		var pContornoa = MAP(pa)(domain1);
		var pContornoa1 = MAP(pa1)(domain1);
		var pContornob = MAP(pb)(domain1);
		var pContornoc = MAP(pc)(domain1);

		var primoContorno = STRUCT([pContornoa,pContornoa1,pContornob,pContornoc]);


		//secondo
		var puntid=[[1.44,2.62,0],[1.38,2.92,0],[1.27,3.14,0]];
		var puntie=[[1.27,3.14,0],[1.09,3.04,0],[0.99,2.84,0]];
		var puntif=[[0.99,2.84,0],[1.09,2.70,0],[1.22,2.57,0]];
		var puntif4=[[1.22,2.57,0],[1.33,2.62,0],[1.44,2.62,0]];

		var pd  = BEZIER(S0)(puntid);
		var pe = BEZIER(S0)(puntie);
		var pf  = BEZIER(S0)(puntif);
		var pf4  = BEZIER(S0)(puntif4);

		var pbez2 = BEZIER(S1)([pd,pf]);
		var pbez2b = BEZIER(S1)([pe,pf4]);

		var psup2 = MAP(pbez2)(domain2);
		var psup2b = MAP(pbez2b)(domain2);

		var psup2Totale = STRUCT([psup2b,psup2]);

		var secondoUpColor = COLOR([2.25,0.6,2.25])(psup2Totale);

		//secondo contorno

		var pContornod = MAP(pd)(domain1);
		var pContornoe = MAP(pe)(domain1);
		var pContornof = MAP(pf)(domain1);
		var pContornof4 = MAP(pf4)(domain1);

		var secondoContorno = STRUCT([pContornod,pContornoe,pContornof,pContornof4]);

		//terzo

		var puntig=[[0.97,2.73,0],[1.10,2.63,0],[1.24,2.48,0]];
		var puntih=[[1.24,2.48,0],[1.26,2.15,0],[1.48,1.85,0]];
		var puntii=[[1.48,1.85,0],[1.17,1.96,0],[0.91,2.23,0]];
		var puntii2=[[0.91,2.23,0],[0.87,2.60,0],[0.97,2.73,0]];


		var pg  = BEZIER(S0)(puntig);
		var ph = BEZIER(S0)(puntih);
		var pi  = BEZIER(S0)(puntii);
		var pi2  = BEZIER(S0)(puntii2);

		var pbez3 = BEZIER(S1)([pg,pi]);
		var pbez3Alfa = BEZIER(S1)([ph,pi2]);

		var psup3 = MAP(pbez3)(domain2);
		var psup3b = MAP(pbez3Alfa)(domain2);

		var psupTerzoTotale = STRUCT([psup3,psup3b]);

		var terzoUpColor = COLOR([2.25,0.9,2.10])(psupTerzoTotale);

		//terzo contorno

		var pContornog = MAP(pg)(domain1);
		var pContornoh = MAP(ph)(domain1);
		var pContornoi = MAP(pi)(domain1);
		var pContornoi2 = MAP(pi2)(domain1);

		var terzoContorno = STRUCT([pContornog,pContornoh,pContornoi,pContornoi2]);


		//quarto
		var puntil=[[1.34,2.58,0],[1.67,2.25,0],[1.57,1.88,0]];
		var puntim=[[1.57,1.88,0],[1.28,2.33,0],[1.27,2.49,0],[1.34,2.58,0]];

		var pl  = BEZIER(S0)(puntil);
		var pm = BEZIER(S0)(puntim);

		var pbez4 = BEZIER(S1)([pl,pm]);

		var psup4 = MAP(pbez4)(domain2);

		var quartoUpColor = COLOR([2.25,1.05,1.95])(psup4);


		//quarto contorno

		var pContornol = MAP(pl)(domain1);
		var pContornom = MAP(pm)(domain1);

		var quartoContorno = STRUCT([pContornol,pContornom]);

		var pezzettialtiSup = STRUCT([primoUpColor,secondoUpColor,terzoUpColor,quartoUpColor]);
		var pezzettialtiCon = STRUCT([primoContorno,secondoContorno,terzoContorno,quartoContorno,pezzettialtiSup]);
		var pezzettiAltiT = T([2])([0.0001])(pezzettialtiCon);

		//DRAW(pezzettiAltiT);

		//parti interne ala bassa

		//primo
		var puntin=[[1.09,1.87,0],[0.85,2.14,0],[0.63,2.36,0]];
		var puntio=[[0.63,2.36,0],[0.26,2.29,0],[0.14,2.14,0],[0.26,1.99,0]];
		var puntip=[[0.26,1.99,0],[0.43,1.95,0],[0.58,1.96,0]];
		var puntipb=[[0.58,1.96,0],[0.84,1.92,0],[1.09,1.87,0]];

		var pn  = BEZIER(S0)(puntin);
		var po = BEZIER(S0)(puntio);
		var pp  = BEZIER(S0)(puntip);
		var ppb  = BEZIER(S0)(puntipb);

		var pbez5 = BEZIER(S1)([pn,pp]);
		var pbez5Alfa = BEZIER(S1)([po,ppb]);

		var psup5 = MAP(pbez5)(domain2);
		var psup5Alfa = MAP(pbez5Alfa)(domain2);

		var psup5Totale = STRUCT([psup5,psup5Alfa]);

		var quintoUpColor = COLOR([2.25,1.05,1.65])(psup5Totale);


		//primo contorno

		var pContornon = MAP(pn)(domain1);
		var pContornoo = MAP(po)(domain1);
		var pContornop = MAP(pp)(domain1);
		var pContornopalfa = MAP(ppb)(domain1);

		var primoContornob = STRUCT([pContornon,pContornoo,pContornop,pContornopalfa]);

		//secondo
		var puntiq=[[1.06,1.82,0],[0.52,1.94,0],[0.25,1.84,0]];
		var puntir=[[0.25,1.84,0],[0.46,1.62,0],[0.90,1.63,0],[1.06,1.82,0]];

		var pq  = BEZIER(S0)(puntiq);
		var pr = BEZIER(S0)(puntir);

		var pbez6 = BEZIER(S1)([pq,pr]);

		var psup6 = MAP(pbez6)(domain2);

		var sestoUpColor = COLOR([2.25,1.35,2.55])(psup6);

		//secondo contorno

		var pContornoq = MAP(pq)(domain1);
		var pContornor = MAP(pr)(domain1);

		var secondoContornob = STRUCT([pContornoq,pContornor]);

		//terzo
		var puntis=[[1.55,1.77,0],[1.26,1.86,0],[1.10,1.76,0]];
		var puntit=[[1.10,1.76,0],[1.27,1.58,0],[1.55,1.77,0]];

		var ps  = BEZIER(S0)(puntis);
		var pt = BEZIER(S0)(puntit);

		var pbez7 = BEZIER(S1)([ps,pt]);

		var psup7 = MAP(pbez7)(domain2);

		var settimoUpColor = COLOR([2.25,1.65,2.25])(psup7);


		//terzo contorno

		var pContornos = MAP(ps)(domain1);
		var pContornot = MAP(pt)(domain1);

		var terzoContornob = STRUCT([pContornos,pContornot]);

		var pezzettibassiSup = STRUCT([quintoUpColor,sestoUpColor,settimoUpColor]);
		var pezzettibassiCon = STRUCT([pezzettibassiSup,primoContornob,secondoContornob,terzoContornob]);
		var pezzettibassiT = T([2])([0.0001])(pezzettibassiCon);

		//DRAW(pezzettibassiT);

		//si colorano le ali della farfalla

		var alaAltacolor = COLOR([0.15,0.15,2.10])(alaa);
		var alabassacolor = COLOR([0,0.45,2.55])(alab);

		//DRAW(alaAltacolor);
		//DRAW(alabassacolor);

		//T([0,1])([2,2.8])

		//R([0,1])(PI)

		var alaCompletaColorata = STRUCT([alaAltacolor,alabassacolor,pezzettibassiT,pezzettiAltiT,alaCompletaContorno]);
		var farfallaHalf = STRUCT([antennaCompleta1,alaCompletaColorata]);
		var farfallaHalf2= R([0,1])(PI/2)(S([1])([-1])(farfallaHalf));
		var farfallaHalf2T = T([0,1])([0,0])(farfallaHalf2);
		var farfallaCompleta=STRUCT([farfallaHalf,farfallaHalf2T]);

		//DRAW(farfallaCompleta);

		//busto farfalla

		var curvaBusto1 = [[0.87,0.97,0],[1.22,1.38,0],[1.49,1.66,0],[1.66,1.77,0],[1.76,1.89,0]];
		var curvaBusto2 = [[1.76,1.89,0],[1.90,1.89,0],[1.89,1.77,0]];
		var curvaBusto3 = [[1.89,1.77,0],[1.74,1.64,0],[1.64,1.50,0],[1.35,1.25,0],[0.97,0.92,0]];
		var curvaBusto4 = [[0.97,0.92,0],[0.86,0.89,0],[0.87,0.97,0]];
		var curvaBustoSpess5 = [[1.66,1.52,0],[1.60,1.56,0.5],[1.56,1.59,0.6],[1.53,1.62,0.5],[1.50,1.67,0]];
		var curvaBustoSpess6 = [[1.40,1.30,0],[1.35,1.35,0.5],[1.34,1.41,0.6],[1.31,1.44,0.5],[1.24,1.41,0]];


		var curvabez1 = BEZIER(S0)(curvaBusto1);
		var curvabez2 = BEZIER(S0)(curvaBusto2);
		var curvabez3 = BEZIER(S0)(curvaBusto3);
		var curvabez4 = BEZIER(S0)(curvaBusto4);
		var curvabezSpess5 = BEZIER(S0)(curvaBustoSpess5);
		var curvabezspess6 = BEZIER(S0)(curvaBustoSpess6);

		var curva1Map = MAP(curvabez1)(domain1);
		var curva2Map = MAP(curvabez2)(domain1);
		var curva3Map = MAP(curvabez3)(domain1);
		var curva4Map = MAP(curvabez4)(domain1);

		var contornoBusto = STRUCT([curva1Map,curva2Map,curva3Map,curva4Map]);

		var curvasup1 = BEZIER(S1)([curvabez1,curvabez3]);
		var curvasup2 = BEZIER(S1)([curvabez2,curvabez4]);
		var curvasup3 = BEZIER(S1)([curvabezSpess5,curvabezspess6]);

		var curvasupMap1 = MAP(curvasup1)(domain2);
		var curvasupMap2 = MAP(curvasup2)(domain2);
		var curvasupMap3 = MAP(curvasup3)(domain2);


		var supBusto = STRUCT([curvasupMap1,curvasupMap2,contornoBusto]);
		var bustocolor = COLOR([0,0,0])(supBusto);

		//DRAW(bustocolor);
			

  ///////////////////////////////////////////*/
  return model
  })();

  exports.author = 'zar777';
  exports.category = 'others';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));
