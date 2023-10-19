import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegisterReturn<string>;
  errors?: Record<string, any>;
};

export default function InputText(props: Props) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <div className='flex items-end'>
        <span className='tw-input-label'>{props.label}</span>
        {props.required && <span className='text-red-400'>&nbsp;*</span>}
      </div>
      <div className='text-md relative flex w-full items-center rounded-lg border-transparent'>
        <input
          disabled={props.disabled}
          placeholder={props.placeholder}
          required={props.required}
          type='text'
          className='tw-input-all'
          {...props.register}
        />
      </div>
      {props.errors && (
        <span className='tw-input-error block'>{props.errors?.message}</span>
      )}
    </div>
  );
}
