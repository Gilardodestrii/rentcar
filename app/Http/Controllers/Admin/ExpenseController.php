<?php

namespace App\Http\Controllers\Admin;

use App\Models\Expense;
use App\Models\Car;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;

class ExpenseController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Expense::with('car');

        if ($request->has('car_id') && $request->car_id !== '') {
            $query->where('car_id', $request->car_id);
        }

        if ($request->has('category') && $request->category !== '') {
            $query->where('category', $request->category);
        }

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('notes', 'like', "%{$search}%");
            });
        }

        $expenses = $query->latest('date')->paginate(15)->through(fn($e) => [
            'id' => $e->id,
            'car' => $e->car ? [
                'id' => $e->car->id,
                'brand' => $e->car->brand,
                'model' => $e->car->model,
                'plate_number' => $e->car->plate_number,
            ] : null,
            'title' => $e->title,
            'amount' => $e->amount,
            'date' => $e->date->format('Y-m-d'),
            'category' => $e->category,
        ]);

        $cars = Car::all()->map(fn($c) => [
            'id' => $c->id,
            'label' => "{$c->brand} {$c->model} ({$c->plate_number})",
        ]);

        return inertia('Admin/Expenses/Index', [
            'expenses' => $expenses,
            'cars' => $cars,
            'filters' => $request->only(['car_id', 'category', 'search']),
        ]);
    }

    public function create(): Response
    {
        $cars = Car::all()->map(fn($c) => [
            'id' => $c->id,
            'label' => "{$c->brand} {$c->model} ({$c->plate_number})",
        ]);

        return inertia('Admin/Expenses/Create', [
            'cars' => $cars,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'title' => 'required|string|max:200',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'category' => 'required|in:maintenance,fuel,insurance,tax,other',
            'notes' => 'nullable|string|max:500',
        ]);

        Expense::create($validated);

        return redirect()->route('admin.expenses.index')
            ->with('success', 'Pengeluaran berhasil ditambahkan');
    }

    public function edit(Expense $expense): Response
    {
        $cars = Car::all()->map(fn($c) => [
            'id' => $c->id,
            'label' => "{$c->brand} {$c->model} ({$c->plate_number})",
        ]);

        return inertia('Admin/Expenses/Edit', [
            'expense' => [
                'id' => $expense->id,
                'car_id' => $expense->car_id,
                'title' => $expense->title,
                'amount' => $expense->amount,
                'date' => $expense->date->format('Y-m-d'),
                'category' => $expense->category,
                'notes' => $expense->notes,
            ],
            'cars' => $cars,
        ]);
    }

    public function update(Request $request, Expense $expense)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'title' => 'required|string|max:200',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'category' => 'required|in:maintenance,fuel,insurance,tax,other',
            'notes' => 'nullable|string|max:500',
        ]);

        $expense->update($validated);

        return redirect()->route('admin.expenses.index')
            ->with('success', 'Pengeluaran berhasil diupdate');
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();

        return redirect()->route('admin.expenses.index')
            ->with('success', 'Pengeluaran berhasil dihapus');
    }
}
