<?php

namespace App\Http\Controllers\Admin;

use App\Models\Driver;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class DriverController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Driver::query();

        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('license_number', 'like', "%{$search}%");
            });
        }

        $drivers = $query->paginate(15)->through(fn($d) => [
            'id' => $d->id,
            'name' => $d->name,
            'phone' => $d->phone,
            'license_number' => $d->license_number,
            'daily_rate' => $d->daily_rate,
            'status' => $d->status,
            'photo' => $d->photo ? asset('storage/' . $d->photo) : null,
        ]);

        return inertia('Admin/Drivers/Index', [
            'drivers' => $drivers,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function create(): Response
    {
        return inertia('Admin/Drivers/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'license_number' => 'required|string|max:50|unique:drivers',
            'daily_rate' => 'required|numeric|min:0',
            'status' => 'required|in:available,unavailable',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('drivers', 'public');
        }

        Driver::create($validated);

        return redirect()->route('admin.drivers.index')
            ->with('success', 'Sopir berhasil ditambahkan');
    }

    public function edit(Driver $driver): Response
    {
        return inertia('Admin/Drivers/Edit', [
            'driver' => [
                'id' => $driver->id,
                'name' => $driver->name,
                'phone' => $driver->phone,
                'license_number' => $driver->license_number,
                'daily_rate' => $driver->daily_rate,
                'status' => $driver->status,
                'photo' => $driver->photo ? asset('storage/' . $driver->photo) : null,
            ],
        ]);
    }

    public function update(Request $request, Driver $driver)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'license_number' => 'required|string|max:50|unique:drivers,license_number,' . $driver->id,
            'daily_rate' => 'required|numeric|min:0',
            'status' => 'required|in:available,unavailable',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            if ($driver->photo) {
                Storage::disk('public')->delete($driver->photo);
            }
            $validated['photo'] = $request->file('photo')->store('drivers', 'public');
        }

        $driver->update($validated);

        return redirect()->route('admin.drivers.index')
            ->with('success', 'Sopir berhasil diupdate');
    }

    public function destroy(Driver $driver)
    {
        if ($driver->photo) {
            Storage::disk('public')->delete($driver->photo);
        }

        $driver->delete();

        return redirect()->route('admin.drivers.index')
            ->with('success', 'Sopir berhasil dihapus');
    }
}
