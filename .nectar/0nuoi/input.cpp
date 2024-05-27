/*
 * This file is part of NectarJS
 * Copyright (c) 2017 - 2020 Adrien THIERRY
 * http://nectarjs.com - https://seraum.com/
 *
 * sources : https://github.com/nectarjs/nectarjs
 * 
 * NectarJS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * NectarJS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with NectarJS.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
 
 #define __Nectar_ENV_STD
 #include "nectar.hpp"
 
 using namespace NectarCore::Global;
 using namespace NectarCore::Functions;
 using namespace NectarCore::JS;
 var __NJS_ENV = "std";
 var __NJS_PLATFORM = "linux";
 
 #define __NJS_Create_Object() new NectarCore::Class::Object()
 #define __NJS_Create_Array(_arr) new NectarCore::Class::Array(_arr)
 #define __NJS_InitVar() NectarCore::VAR()
 #include "/var/www/html/proyecto/ProyectoCompilador/.nectar/0nuoi/lib/console.h"
#include "/var/www/html/proyecto/ProyectoCompilador/.nectar/0nuoi/libperformance/perf.h"
#include "/var/www/html/proyecto/ProyectoCompilador/.nectar/0nuoi/libregexp/regexp.h"
#include "/var/www/html/proyecto/ProyectoCompilador/.nectar/0nuoi/lib/native_object.h"
#include "/var/www/html/proyecto/ProyectoCompilador/.nectar/0nuoi/lib/math.h"
#include "/var/www/html/proyecto/ProyectoCompilador/.nectar/0nuoi/lib/json.h"
#include "/var/www/html/proyecto/ProyectoCompilador/.nectar/0nuoi/libdate/date.h"
 
 var console;;var performance;;var Error;;var RegExp;;var Number;;var Object;;var Math;;var JSON;;var Array;;var Date;;var __NJS_Create_Object;;var __MODULE_3aw9mkwta9;;var __MODULE_kml3ltzcgv;;var _performance;;var __MODULE_e6xberobkp;;var __MODULE_h64n1asnqp;;var _regexp;;var __MODULE_yfbeq03n8a;;var _Number;;var __MODULE_id22r6luu6;;var __MODULE_vnnoxm32rj;;var __MODULE_5q5mf8wt3u;;var __MODULE_g4u161tr1n;;var __MODULE_m9fv0p92th;;var _date;;var __cxvyjn;;var __gnkd5h;

var window; // browser check

int main(int argc, char* argv[])
{
	var __NJS_ARGS = __NJS_Create_Array();
	
	for( int i = 0; i < argc; i++)
	{
		__NJS_ARGS[i] = argv[i];
	}

	try 
	{

		NectarCore::Type::function_t* __NJS_FN___bjbdcm = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
  var console;
   module = __NJS_Create_Object();
  ;
   console = __NJS_Create_Object();
  console["log"] = __Nectar_NATIVE_LOG_CONSOLE;
  ;
  module["exports"] = console;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_3aw9mkwta9=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___bjbdcm);
;
NectarCore::Type::function_t* __NJS_FN___hxudm = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
   module = __NJS_Create_Object();
  ;
  NectarCore::Type::function_t* __NJS_FN___xg6h = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
    __Nectar_THIS["timeOrigin"] = __Nectar_NATIVE_PERFORMANCE_NOW();
 __Nectar_THIS["now"] = NectarCore::VAR(NectarCore::Enum::Type::Function, new NectarCore::Type::function_t ([&](var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH) -> NectarCore::VAR{
      return (__Nectar_NATIVE_PERFORMANCE_NOW() - __Nectar_THIS["timeOrigin"]) * 1000;
    
return NectarCore::Global::undefined;}), __Nectar_THIS);;
   ;return NectarCore::Global::undefined;} );_performance=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___xg6h);
  ;
  module["exports"] = __Nectar_NEW(_performance)();
  ;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_kml3ltzcgv=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___hxudm);
;
NectarCore::Type::function_t* __NJS_FN___ukpw3k = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
  var _Error;
   module = __NJS_Create_Object();
   _Error = __NJS_Create_Object();
  ;
  module["exports"] = _Error;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_e6xberobkp=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___ukpw3k);
;
NectarCore::Type::function_t* __NJS_FN___492fu = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
   module = __NJS_Create_Object();
  ;
  NectarCore::Type::function_t* __NJS_FN___i4xre = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {var _expression; if(__Nectar_VARLENGTH > 0) _expression = __Nectar_VARARGS[0];var  _flag; if(__Nectar_VARLENGTH > 1)  _flag = __Nectar_VARARGS[1];
    __Nectar_THIS["__Nectar_Internal_Expression"] = _expression;
    __Nectar_THIS["flag"] = _flag;
    __Nectar_THIS["test"] = __Nectar_RegExp_Test;
    __Nectar_THIS["exec"] = __Nectar_RegExp_Exec;
   ;return NectarCore::Global::undefined;} );_regexp=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___i4xre);
  ;
  module["exports"] = _regexp;
  ;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_h64n1asnqp=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___492fu);
;
NectarCore::Type::function_t* __NJS_FN___ifsk3o = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
   module = __NJS_Create_Object();
  NectarCore::Type::function_t* __NJS_FN___lgmvn4 = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {var _arg; if(__Nectar_VARLENGTH > 0) _arg = __Nectar_VARARGS[0];
    if (_arg) {
      if (__Nectar_typeof(_arg) == __Nectar_InitVar("string")) {
        return parseInt(_arg);
      } else return _arg;
    }
    return 0;
   ;return NectarCore::Global::undefined;} );_Number=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___lgmvn4);
  module["exports"] = _Number;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_yfbeq03n8a=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___ifsk3o);
;
NectarCore::Type::function_t* __NJS_FN___zgbkkc = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
  var _Object;
   module = __NJS_Create_Object();
  ;
   _Object = __NJS_Create_Object();
  _Object["keys"] = __Nectar_NATIVE_OBJECT_KEYS;
  _Object["freeze"] = __Nectar_NATIVE_OBJECT_FREEZE;
  ;
  module["exports"] = _Object;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_id22r6luu6=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___zgbkkc);
;
NectarCore::Type::function_t* __NJS_FN___kj06pn = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
  var _Math;
   module = __NJS_Create_Object();
  ;
   _Math = __NJS_Create_Object();
  _Math["E"] = __Nectar_MATH_E;
  _Math["LN2"] = __Nectar_MATH_LN2;
  _Math["LOG2E"] = __Nectar_MATH_LOG2E;
  _Math["LOG10E"] = __Nectar_MATH_LOG10E;
  _Math["PI"] = __Nectar_MATH_PI;
  _Math["SQRT1_2"] = __Nectar_MATH_SQRT1_2;
  _Math["SQRT2"] = __Nectar_MATH_SQRT2;
  _Math["abs"] = __Nectar_MATH_ABS;
  _Math["acos"] = __Nectar_MATH_ACOS;
  _Math["acosh"] = __Nectar_MATH_ACOSH;
  _Math["asin"] = __Nectar_MATH_ASIN;
  _Math["asinh"] = __Nectar_MATH_ASINH;
  _Math["atan"] = __Nectar_MATH_ATAN;
  _Math["atanh"] = __Nectar_MATH_ATANH;
  _Math["atan2"] = __Nectar_MATH_ATAN2;
  _Math["cbrt"] = __Nectar_MATH_CBRT;
  _Math["ceil"] = __Nectar_MATH_CEIL;
  _Math["clz32"] = __Nectar_MATH_CLZ32;
  _Math["cos"] = __Nectar_MATH_COS;
  _Math["cosh"] = __Nectar_MATH_COSH;
  _Math["exp"] = __Nectar_MATH_EXP;
  _Math["expm1"] = __Nectar_MATH_EXPM1;
  _Math["floor"] = __Nectar_MATH_FLOOR;
  _Math["fround"] = __Nectar_MATH_FROUND;
  _Math["hypot"] = __Nectar_MATH_HYPOT;
  _Math["imul"] = __Nectar_MATH_IMUL;
  _Math["log"] = __Nectar_MATH_LOG;
  _Math["log1p"] = __Nectar_MATH_LOG1P;
  _Math["log10"] = __Nectar_MATH_LOG10;
  _Math["log2"] = __Nectar_MATH_LOG2;
  _Math["max"] = __Nectar_MATH_MAX;
  _Math["min"] = __Nectar_MATH_MIN;
  _Math["pow"] = __Nectar_MATH_POW;
  _Math["random"] = __Nectar_MATH_RANDOM;
  _Math["round"] = __Nectar_MATH_ROUND;
  _Math["sign"] = __Nectar_MATH_SIGN;
  _Math["sin"] = __Nectar_MATH_SIN;
  _Math["sinh"] = __Nectar_MATH_SINH;
  _Math["sqrt"] = __Nectar_MATH_SQRT;
  _Math["tan"] = __Nectar_MATH_TAN;
  _Math["tanh"] = __Nectar_MATH_TANH;
  _Math["trunc"] = __Nectar_MATH_TRUNC;
   __cxvyjn = NectarCore::VAR(NectarCore::Enum::Type::Function, new NectarCore::Type::function_t ([](var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH) -> NectarCore::VAR{
                      
    return __Nectar_InitVar("[object Math]");
  
return NectarCore::Global::undefined;}), __Nectar_THIS);;
  _Math["toString"] = __cxvyjn;
  ;
  module["exports"] = _Math;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_vnnoxm32rj=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___kj06pn);
;
NectarCore::Type::function_t* __NJS_FN___tn837a = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
  var _JSON;
   module = __NJS_Create_Object();
  ;
   _JSON = __NJS_Create_Object();
  _JSON["parse"] = __Nectar_JSON_PARSE;
  _JSON["stringify"] = __Nectar_JSON_STRINGIFY;
  ;
  module["exports"] = _JSON;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_5q5mf8wt3u=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___tn837a);
;
NectarCore::Type::function_t* __NJS_FN___vjogxi = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
  var _Array;
   module = __NJS_Create_Object();
   _Array = __NJS_Create_Object();
  var __1f7t3 = __NJS_Create_Object();
   __gnkd5h = NectarCore::VAR(NectarCore::Enum::Type::Function, new NectarCore::Type::function_t ([](var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH) -> NectarCore::VAR{
                      
    console["log"](__Nectar_THIS);
  
return NectarCore::Global::undefined;}), __Nectar_THIS);;
  __1f7t3["slice"] = __gnkd5h;
  _Array["prototype"] = __1f7t3;
  ;
  module["exports"] = _Array;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_g4u161tr1n=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___vjogxi);
;
NectarCore::Type::function_t* __NJS_FN___owk5ch = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
   module = __NJS_Create_Object();
  ;
  NectarCore::Type::function_t* __NJS_FN___98c5q6 = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {var _date; if(__Nectar_VARLENGTH > 0) _date = __Nectar_VARARGS[0];
    __Nectar_THIS["__Nectar_Internal_Date"] = _date;
   ;return NectarCore::Global::undefined;} );_date=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___98c5q6);
  ;
  _date["now"] = __Nectar_NATIVE_DATE_NOW;
  module["exports"] = _date;
  ;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_m9fv0p92th=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___owk5ch);
;
		
		#ifdef __Nectar_INIT_RAND_SEED
		srand (time(NULL));
		#endif
		{
			console = __MODULE_3aw9mkwta9();
performance = __MODULE_kml3ltzcgv();
Error = __MODULE_e6xberobkp();
RegExp = __MODULE_h64n1asnqp();
Number = __MODULE_yfbeq03n8a();
Object = __MODULE_id22r6luu6();
Math = __MODULE_vnnoxm32rj();
JSON = __MODULE_5q5mf8wt3u();
Array = __MODULE_g4u161tr1n();
Date = __MODULE_m9fv0p92th();
console["log"]("Hola, mundo 2!");

			NectarCore::Event::Loop();
		}
		
	}
	catch(NectarCore::VAR __Nectar_Global_Exception)
	{
		__Nectar_Log_Console(__Nectar_Global_Exception);
		exit(1);
	}
	return 0;
}
