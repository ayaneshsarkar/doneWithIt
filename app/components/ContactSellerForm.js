import { Keyboard } from 'react-native'
import * as Yup from 'yup'
import messagesApi from '../services/messages'
import { presentLocalNotification } from '../utility/noitification'
import { AppForm, AppFormField, SubmitButton } from './forms'

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

const ContactSellerForm = ({ listing }) => {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss()

    const result = await messagesApi.send(message, listing.id)

    if (!result.ok) {
      console.log('Error', result)
    }

    resetForm()

    await presentLocalNotification(
      'Awesome!',
      'Your message was sent to the seller.'
    )
  }

  return (
    <AppForm
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <AppFormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Message..."
      />
      <SubmitButton title="Contact Seller" />
    </AppForm>
  )
}

export default ContactSellerForm