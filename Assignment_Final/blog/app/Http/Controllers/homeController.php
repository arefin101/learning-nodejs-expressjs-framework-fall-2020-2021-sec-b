<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\userRequest;
use App\User;

class homeController extends Controller
{
    public function home(request $req){

        return view('home', ['username' => session()->get('username')]);
        
    }

    public function create(){

        return view('create');
        
    }

    public function store(userRequest $req){

        $user = new User;

        $user->name = $req->name;
        $user->comName = $req->comName;
        $user->contact = $req->contact;
        $user->userName = $req->userName;
        $user->password = $req->password;

        if($user->save()){
            return redirect()->route('stdlist');
        }
        
    }

    public function stdlist(){

        $user = User::all();

        return view('stdlist')->with('user', $user);
    }

    public function edit($id){

        $user = User::find($id);

        return view('edit',$user);
    }

    public function edited(Request $req, $id){

        $user = User::find($id);

        $user->name = $req->name;
        $user->comName = $req->comName;
        $user->contact = $req->contact;
        $user->userName = $req->userName;
        $user->password = $req->password;

        if($user->save()){
            return redirect()->route('stdlist');
        }
    }
    
}
