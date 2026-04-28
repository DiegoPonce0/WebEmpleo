import { CreateNewExperience } from '../../components/CreateNewExperience'
import { ProfileForm } from '../../components/ProfileForm'
import { EditExperience } from '../../components/EditExperienceForm'
import styles from './EditProfile.module.css'

export default function UpdateProfile() {

  return (
    <main className={styles.container}>
      
      <ProfileForm />
      
      <EditExperience />

      <CreateNewExperience />

    </main>
  )
}