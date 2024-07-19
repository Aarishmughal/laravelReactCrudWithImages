<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Item::all();
        return response()->json($items);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "price" => "required|numeric",
            "quantity" => "required|integer",
            "image" => "nullable|image|mimes:jpeg,png,pneg,gif,svg|max:5120"
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $imagePath;
        }

        $item = Item::create($validatedData);

        return response()->json($item, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $item = Item::findOrFail($id);
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        dd($request->all());
        echo "<pre>adasd";
        print_r($request->all());
        exit;
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "price" => "required|numeric",
            "quantity" => "required|integer",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120", // Adjust mimes and max size as needed
        ]);
        

        $item = Item::findOrFail($id);

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }

            $imagePath = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $imagePath;
        }

        $item->update($validatedData);

        return response()->json($item, 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $item = Item::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}
