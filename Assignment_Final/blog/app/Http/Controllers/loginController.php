<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class loginController extends Controller
{
    public function index(){
        return view('login.index');
    }

    public function verify(Request $req){

        $user = DB::table('user')
                    ->where('userName', $req->username)
                    ->where('password', $req->password)
                    ->get();

        
        if(count($user) > 0){
           
            $req->session()->put('username', $req->username);
            
    		return redirect()->route('home');
    	}else{
            $req->session()->flash('error', 'invalid username/password');
    		return redirect()->route('login');
    	}
    }

}
