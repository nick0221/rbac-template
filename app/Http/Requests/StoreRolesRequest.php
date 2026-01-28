<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRolesRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:100', 'unique:roles,name'],
        ];
    }

    // normalize the role name
    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => ucfirst(strtolower(trim($this->name))),
        ]);
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The role name is required.',
            'name.max' => 'The role name must not be greater than 100 characters.',
            'name.unique' => 'The role name already exists, choose another name.',
        ];
    }



}
