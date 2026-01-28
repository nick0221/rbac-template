<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
        $userId = $this->route('user')?->id;

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                    Rule::unique('users', 'email')->ignore($userId),
            ],
            'role_id' => ['required', 'exists:roles,id'],
        ];
    }



    // custom error messages
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.max' => 'The name field must not be greater than 100 characters.',
            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'This email already exists, choose another email.',

            'role_id.required' => 'The role field is required.',
        ];
    }



}
