<?php

namespace App\Http\Controllers;

use Mail;
use View;
use stdClass;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Image;

class APIController extends Controller
{

    /**
     * Create a new admin controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    public function postContact(Request $request)
    {   
        $contact = new stdClass();
        $contact->name    = $request->input('name');
        $contact->email   = $request->input('email');
        $contact->message = $request->input('message');

        Mail::send('emails.contact', ['contact' => $contact], function ($m) {
            $m->from('mihaigeorge.c@gmail.com', 'Mihai Cracan');

            $m->to('mihaigeorge.c@gmail.com');

            $m->subject('[MIHAI CRACAN] New Contact Message');
        });

        return response()->json(array(
            'status' => 'success'
        ));
    }

    public function getProject(Request $request)
    {
        $project = $request->input('project');
        $data    = '';

        if (View::exists('projects.' . $project)) {
            $view = View::make('projects.' . $project);
            $data = $view->render();
        }

        return response()->json(array(
            'status'  => 'success',
            'project' => $data
        ));
    }
}
