<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:permissions,name'],
        ];
    }

    // normalize the permission name
    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => ucfirst(strtolower(trim($this->name))),
        ]);
    }


    // custom error messages
    public function messages(): array
    {
        return [
            'name.required' => 'The permission name is required.',
            'name.max' => 'The permission name must not be greater than 255 characters.',
            'name.unique' => 'The permission name already exists, choose another name.',
        ];
    }

}
