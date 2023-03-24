import { IContact, IFormsState } from 'pages/Forms';
import React, { Component } from 'react';
import { checkPhoneInput } from '../utils/checkPhoneInputs';
import { checkGenderInputs } from '../utils/checkGenderInputs';
import { checkNameInput } from '../utils/checkNameInput';

export type TErrorsUpdate = {
  nameError: string;
  genderError: string;
  phoneError: string;
};

interface IFormProps {
  updateContacts: (e: IContact[]) => void;
  updateErrors: (e: TErrorsUpdate) => void;
  prevState: IFormsState;
}

const NAME_ERROR_MESSAGE = 'Аt least 2 words starting with a capital letter are expected';
const PHONE_ERROR_MESSAGE =
  'Must start with "+", contain only digits and be no shorter than 9 digits';
const GENDER_ERROR_MESSAGE = 'Please select one of the values';

export default class Form extends Component<IFormProps> {
  form = React.createRef<HTMLFormElement>();
  name = React.createRef<HTMLInputElement>();
  phone = React.createRef<HTMLInputElement>();
  date = React.createRef<HTMLInputElement>();
  select = React.createRef<HTMLSelectElement>();
  favorite = React.createRef<HTMLInputElement>();
  male = React.createRef<HTMLInputElement>();
  female = React.createRef<HTMLInputElement>();
  fileInput = React.createRef<HTMLInputElement>();
  constructor(props: IFormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.validation()) {
      const newContact: IContact = {
        id: this.props.prevState.contacts.length ? this.props.prevState.contacts.length : 0,
        name: this.name.current!.value,
        phone: this.phone.current!.value,
        date:
          this.date.current!.value.split('-').length === 3
            ? this.date.current!.value.split('-')
            : [],
        role: this.select.current!.value,
        favorite: this.favorite.current!.checked,
        gender: this.male.current?.checked ? 'male' : 'female',
        photo: URL.createObjectURL(this.fileInput.current!.files![0]),
      };
      alert('The data has been saved!');
      this.props.updateContacts([...this.props.prevState.contacts, newContact]);
      this.form.current!.reset();
    }
  }

  validation = () => {
    const isName = checkNameInput(this.name.current!.value);
    const isGender = checkGenderInputs(this.male.current!.checked, this.female.current!.checked);
    const isPhone = checkPhoneInput(this.phone.current!.value.trim());
    this.props.updateErrors({
      nameError: !isName ? NAME_ERROR_MESSAGE : '',
      genderError: !isGender ? GENDER_ERROR_MESSAGE : '',
      phoneError: !isPhone ? PHONE_ERROR_MESSAGE : '',
    });
    if (isName && isGender && isPhone) return true;
    return false;
  };
  render() {
    return (
      <form
        className="flex flex-col items-start px-4"
        ref={this.form}
        onSubmit={(event) => this.handleSubmit(event)}
      >
        <h2 className="mb-3 text-2xl font-semibold">Here you can add your contacts info</h2>
        <input
          className="border rounded py-1 px-4 mb-2 lg:w-80 sm:w-3/4 w-full"
          type="text"
          ref={this.name}
          placeholder="Enter contact's name and surname"
        />
        {this.props.prevState.nameError && (
          <span className="text-sm text-red-600">{this.props.prevState.nameError}</span>
        )}
        <input
          className="border rounded py-1 px-4 mb-2 lg:w-80 sm:w-3/4 w-full"
          type="text"
          ref={this.phone}
          placeholder="Enter contact's phone"
        />
        {this.props.prevState.phoneError && (
          <span className="text-sm text-red-600">{this.props.prevState.phoneError}</span>
        )}
        <label className="text-xl font-medium">
          Birth date:
          <input
            className="border rounded py-1 px-2 ml-2 mb-2"
            type="date"
            min="01-01-1900"
            pattern="\d{2}-\d{2}-\d{4}"
            ref={this.date}
          />
        </label>
        <label className="text-xl font-medium">
          Role:
          <select
            className="rounded py-1 px-4 w-28 ml-2 mb-2"
            defaultValue="friend"
            ref={this.select}
          >
            <option value="coworker">Coworker</option>
            <option value="family">Family</option>
            <option value="friend">Friend</option>
            <option value="stranger">Stranger</option>
          </select>
        </label>
        <label className="text-xl font-medium flex items-center">
          Favorite:
          <input
            className="rounded py-1 px-2 ml-2"
            type="checkbox"
            name="favorite"
            value="true"
            id="favorite"
            ref={this.favorite}
          />
        </label>
        <div className="flex flex-col py-2">
          <div className="flex items-center">
            <h3 className="text-xl font-medium mr-2">Gender:</h3>
            <label className="flex items-center px-2 mr-3">
              Male
              <input
                className="ml-2"
                type="radio"
                name="Gender"
                value="Male"
                id="Male"
                ref={this.male}
              />
            </label>
            <label>
              Female
              <input
                className="ml-2"
                type="radio"
                name="Gender"
                value="Female"
                id="Female"
                ref={this.female}
              />
            </label>
          </div>
          {this.props.prevState.genderError && (
            <span className="text-sm text-red-600">{this.props.prevState.genderError}</span>
          )}
        </div>
        <label className="flex flex-col text-xl font-medium mb-3">
          Add photo:
          <input type="file" accept="image/*" ref={this.fileInput} />
        </label>
        <button
          className="border border-blue-500 rounded-sm bg-white px-5 py-2 hover:bg-blue-500 transition-colors"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}
