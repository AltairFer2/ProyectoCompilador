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
 #include "/var/www/html/ProyectoCompilador/.nectar/0npze/lib/console.h"
#include "/var/www/html/ProyectoCompilador/.nectar/0npze/libperformance/perf.h"
#include "/var/www/html/ProyectoCompilador/.nectar/0npze/libregexp/regexp.h"
#include "/var/www/html/ProyectoCompilador/.nectar/0npze/lib/native_object.h"
#include "/var/www/html/ProyectoCompilador/.nectar/0npze/lib/math.h"
#include "/var/www/html/ProyectoCompilador/.nectar/0npze/lib/json.h"
#include "/var/www/html/ProyectoCompilador/.nectar/0npze/libdate/date.h"
 
 var console;;var performance;;var Error;;var RegExp;;var Number;;var Object;;var Math;;var JSON;;var Array;;var Date;;var __NJS_Create_Object;;var __MODULE_tr0jks1187;;var __MODULE_38jidxjext;;var _performance;;var __MODULE_u8dzxyirol;;var __MODULE_o6ltip8ddn;;var _regexp;;var __MODULE_7qp8pku8hk;;var _Number;;var __MODULE_97ysexisca;;var __MODULE_1skh9gwznf;;var __MODULE_5ki9pmqp7z;;var __MODULE_q30wwww1c8;;var __MODULE_a5s87egfnq;;var _date;;var __mfcx2;;var __eph63;

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

		NectarCore::Type::function_t* __NJS_FN___7xpzi8 = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
  var console;
   module = __NJS_Create_Object();
  ;
   console = __NJS_Create_Object();
  console["log"] = __Nectar_NATIVE_LOG_CONSOLE;
  ;
  module["exports"] = console;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_tr0jks1187=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___7xpzi8);
;
NectarCore::Type::function_t* __NJS_FN___lol4b = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
   module = __NJS_Create_Object();
  ;
  NectarCore::Type::function_t* __NJS_FN___5wjvv = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
    __Nectar_THIS["timeOrigin"] = __Nectar_NATIVE_PERFORMANCE_NOW();
 __Nectar_THIS["now"] = NectarCore::VAR(NectarCore::Enum::Type::Function, new NectarCore::Type::function_t ([&](var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH) -> NectarCore::VAR{
      return (__Nectar_NATIVE_PERFORMANCE_NOW() - __Nectar_THIS["timeOrigin"]) * 1000;
    
return NectarCore::Global::undefined;}), __Nectar_THIS);;
   ;return NectarCore::Global::undefined;} );_performance=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___5wjvv);
  ;
  module["exports"] = __Nectar_NEW(_performance)();
  ;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_38jidxjext=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___lol4b);
;
NectarCore::Type::function_t* __NJS_FN___y6nrd = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
  var _Error;
   module = __NJS_Create_Object();
   _Error = __NJS_Create_Object();
  ;
  module["exports"] = _Error;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_u8dzxyirol=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___y6nrd);
;
NectarCore::Type::function_t* __NJS_FN___ifgx54 = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
   module = __NJS_Create_Object();
  ;
  NectarCore::Type::function_t* __NJS_FN___sbxy7 = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {var _expression; if(__Nectar_VARLENGTH > 0) _expression = __Nectar_VARARGS[0];var  _flag; if(__Nectar_VARLENGTH > 1)  _flag = __Nectar_VARARGS[1];
    __Nectar_THIS["__Nectar_Internal_Expression"] = _expression;
    __Nectar_THIS["flag"] = _flag;
    __Nectar_THIS["test"] = __Nectar_RegExp_Test;
    __Nectar_THIS["exec"] = __Nectar_RegExp_Exec;
   ;return NectarCore::Global::undefined;} );_regexp=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___sbxy7);
  ;
  module["exports"] = _regexp;
  ;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_o6ltip8ddn=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___ifgx54);
;
NectarCore::Type::function_t* __NJS_FN___khxjrm = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
   module = __NJS_Create_Object();
  NectarCore::Type::function_t* __NJS_FN___5tsrlj = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {var _arg; if(__Nectar_VARLENGTH > 0) _arg = __Nectar_VARARGS[0];
    if (_arg) {
      if (__Nectar_typeof(_arg) == __Nectar_InitVar("string")) {
        return parseInt(_arg);
      } else return _arg;
    }
    return 0;
   ;return NectarCore::Global::undefined;} );_Number=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___5tsrlj);
  module["exports"] = _Number;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_7qp8pku8hk=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___khxjrm);
;
NectarCore::Type::function_t* __NJS_FN___5bhx1j = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
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
 ;return NectarCore::Global::undefined;} );__MODULE_97ysexisca=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___5bhx1j);
;
NectarCore::Type::function_t* __NJS_FN___2dy0ri = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
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
   __mfcx2 = NectarCore::VAR(NectarCore::Enum::Type::Function, new NectarCore::Type::function_t ([](var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH) -> NectarCore::VAR{
                      
    return __Nectar_InitVar("[object Math]");
  
return NectarCore::Global::undefined;}), __Nectar_THIS);;
  _Math["toString"] = __mfcx2;
  ;
  module["exports"] = _Math;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_1skh9gwznf=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___2dy0ri);
;
NectarCore::Type::function_t* __NJS_FN___ui2tnl = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
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
 ;return NectarCore::Global::undefined;} );__MODULE_5ki9pmqp7z=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___ui2tnl);
;
NectarCore::Type::function_t* __NJS_FN___ir8j9f = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
  var _Array;
   module = __NJS_Create_Object();
   _Array = __NJS_Create_Object();
  var __a7tnt = __NJS_Create_Object();
   __eph63 = NectarCore::VAR(NectarCore::Enum::Type::Function, new NectarCore::Type::function_t ([](var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH) -> NectarCore::VAR{
                      
    console["log"](__Nectar_THIS);
  
return NectarCore::Global::undefined;}), __Nectar_THIS);;
  __a7tnt["slice"] = __eph63;
  _Array["prototype"] = __a7tnt;
  ;
  module["exports"] = _Array;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_q30wwww1c8=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___ir8j9f);
;
NectarCore::Type::function_t* __NJS_FN___7tsc56 = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {
  var module;
   module = __NJS_Create_Object();
  ;
  NectarCore::Type::function_t* __NJS_FN___hc6t9p = new NectarCore::Type::function_t([&]( var __Nectar_THIS, NectarCore::VAR* __Nectar_VARARGS, int __Nectar_VARLENGTH ) -> NectarCore::VAR {var _date; if(__Nectar_VARLENGTH > 0) _date = __Nectar_VARARGS[0];
    __Nectar_THIS["__Nectar_Internal_Date"] = _date;
   ;return NectarCore::Global::undefined;} );_date=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___hc6t9p);
  ;
  _date["now"] = __Nectar_NATIVE_DATE_NOW;
  module["exports"] = _date;
  ;
  return module["exports"];
 ;return NectarCore::Global::undefined;} );__MODULE_a5s87egfnq=NectarCore::VAR(NectarCore::Enum::Type::Function, __NJS_FN___7tsc56);
;
		
		#ifdef __Nectar_INIT_RAND_SEED
		srand (time(NULL));
		#endif
		{
			console = __MODULE_tr0jks1187();
performance = __MODULE_38jidxjext();
Error = __MODULE_u8dzxyirol();
RegExp = __MODULE_o6ltip8ddn();
Number = __MODULE_7qp8pku8hk();
Object = __MODULE_97ysexisca();
Math = __MODULE_1skh9gwznf();
JSON = __MODULE_5ki9pmqp7z();
Array = __MODULE_q30wwww1c8();
Date = __MODULE_a5s87egfnq();
Intermedio: console["log"]("Hola, mundo!");

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
