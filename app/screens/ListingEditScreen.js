import { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
import useLocation from '../hooks/useLocation';
import {
  AppForm,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
  FormImagePicker
} from '../components/forms';
import UploadScreen from './UploadScreen';
import Screen from '../components/Screen';
import listingsAPI from '../services/listings'

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  price: Yup.number().required().min(1).max(10000).label('Price'),
  description: Yup.string().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
  images: Yup.array().min(1, 'Please select at least one image.')
});

const categories = [
  { label: 'Furniture', value: 1 },
  { label: 'Clothing', value: 2 },
  { label: 'Camera', value: 3 },
];

const ListingEditScreen = ({ navigation }) => {
  const [uploadVisible, setUploadVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  const location = useLocation()

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0)
    setUploadVisible(true)
    const result = await listingsAPI.addListing({ ...listing, location }, (progress) => {
      setProgress(progress)
    })
    setUploadVisible(false)
    if (!result.ok) {
      console.log(result.data, listing)
      return alert('Could not save listing.')
    }

    alert('Success')

    resetForm()
  }

  return (
    <Screen style={styles.container}>
      <UploadScreen visible={uploadVisible} progress={progress} />
      <AppForm
        initialValues={{
          title: '',
          price: '',
          description: '',
          category: null,
          images: []
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name='title' placeholder='Title' />
        <FormField
          keyboardType='numeric'
          maxLength={8}
          name='price'
          placeholder='Price'
        />
        <Picker
          items={categories}
          name='category'
          placeholder='Category'
        />
        <FormField
          maxLength={255}
          multiline
          name='description'
          numberOfLines={3}
          placeholder='Description'
        />
        <SubmitButton title='Post' />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ListingEditScreen;
