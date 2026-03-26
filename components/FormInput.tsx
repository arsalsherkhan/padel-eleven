import React from 'react';

type BaseInputProps = {
  label: string;
  name: string;
  required?: boolean;
};

type TextInputProps = BaseInputProps & {
  type: 'text' | 'tel';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type SelectInputProps = BaseInputProps & {
  type: 'select';
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

type CheckboxInputProps = BaseInputProps & {
  type: 'checkbox';
  options: string[];
  value: string[];
  onChange: (options: string[]) => void;
};

type RadioInputProps = BaseInputProps & {
  type: 'radio';
  options: string[];
  value: string;
  onChange: (val: string) => void;
};

type RadioScaleProps = BaseInputProps & {
  type: 'radio-scale';
  minLabel: string;
  maxLabel: string;
  value: string;
  onChange: (val: string) => void;
};

type TextareaProps = BaseInputProps & {
  type: 'textarea';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export type FormInputProps = 
  | TextInputProps 
  | SelectInputProps 
  | CheckboxInputProps 
  | RadioInputProps 
  | RadioScaleProps 
  | TextareaProps;

const inputClasses = "w-full bg-slate border border-[#333] text-chalk rounded-lg px-4 py-3 focus:ring-1 focus:ring-volt focus:border-volt focus:outline-none transition-colors font-sans font-light";

export const FormInput: React.FC<FormInputProps> = (props) => {
  const { label, name, required } = props;

  return (
    <div className="mb-6 flex flex-col gap-2">
      <label className="font-sans font-medium text-chalk text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {props.type === 'text' || props.type === 'tel' ? (
        <input 
          type={props.type}
          name={name}
          required={required}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          className={inputClasses}
        />
      ) : props.type === 'textarea' ? (
        <textarea
          name={name}
          required={required}
          placeholder={props.placeholder}
          rows={4}
          value={props.value}
          onChange={props.onChange}
          className={inputClasses}
        />
      ) : props.type === 'select' ? (
        <select
          name={name}
          required={required}
          value={props.value}
          onChange={props.onChange}
          className={`${inputClasses} appearance-none cursor-pointer`}
        >
          <option value="" disabled>Select an option</option>
          {props.options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : props.type === 'checkbox' ? (
        <div className="flex flex-col gap-3 mt-1">
          {props.options.map(opt => (
             <label key={opt} className="flex items-center gap-3 cursor-pointer group">
               <input 
                 type="checkbox" 
                 name={name}
                 value={opt}
                 checked={props.value.includes(opt)}
                 onChange={(e) => {
                   const set = new Set(props.value);
                   if (e.target.checked) set.add(opt);
                   else set.delete(opt);
                   props.onChange(Array.from(set));
                 }}
                 className="w-5 h-5 rounded bg-slate border-[#333] text-volt focus:ring-volt focus:ring-offset-coal"
               />
               <span className="font-sans font-light text-chalk/90 group-hover:text-chalk transition-colors">{opt}</span>
             </label>
          ))}
        </div>
      ) : props.type === 'radio' ? (
        <div className="flex flex-col gap-3 mt-1">
          {props.options.map(opt => (
             <label key={opt} className="flex items-center gap-3 cursor-pointer group">
               <input 
                 type="radio" 
                 name={name}
                 value={opt}
                 required={required}
                 checked={props.value === opt}
                 onChange={(e) => props.onChange(e.target.value)}
                 className="w-5 h-5 bg-slate border-[#333] text-volt focus:ring-volt focus:ring-offset-coal"
               />
               <span className="font-sans font-light text-chalk/90 group-hover:text-chalk transition-colors">{opt}</span>
             </label>
          ))}
        </div>
      ) : props.type === 'radio-scale' ? (
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex justify-between w-full px-2 mb-1">
             <span className="text-xs text-[#666] font-sans">{props.minLabel}</span>
             <span className="text-xs text-[#666] font-sans">{props.maxLabel}</span>
          </div>
          <div className="flex justify-between items-center w-full px-2">
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num} className="flex flex-col items-center gap-1 cursor-pointer">
                <input 
                  type="radio" 
                  name={name}
                  required={required}
                  value={num.toString()}
                  checked={props.value === num.toString()}
                  onChange={(e) => props.onChange(e.target.value)}
                  className="w-6 h-6 bg-slate border-[#333] text-volt focus:ring-volt focus:ring-offset-coal"
                />
                <span className="font-condensed font-bold text-chalk mt-1 text-lg">{num}</span>
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
