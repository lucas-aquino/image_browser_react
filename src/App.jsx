import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Form, Field, Formik } from 'formik'

function App() {

  const [ photos, setPhotos ] = useState([]) 

  const styles = {
    main: [
      'bg-slate-900',
      'w-100',
      'min-h-screen',
      'box-content'
    ].join(' '),
    header: [
      'flex',
      'justify-center',
    ].join(' '),
    navbar: [
      'border-b',
      'border-slate-800',
      'bg-slate-900'
    ].join(' '),
    textField: [
      'bg-slate-800',
      'hover:bg-slate-700', 
      'border',
      'border-gray-700',
      'rounded-lg',
      'active:bg-slate-700', 
      'focus:outline-none', 
      'focus:ring', 
      'focus:ring-indigo-300',
      'text-slate-300',
      'px-4',
      'py-2',
    ].join(' '),
    searchBar: [
      'focus:ring-slate-300',
      'rounded-full',
      'border-none',
      'w-full',
      'px-6'
    ].join(' '),
    searchForm: [
      'w-2/5',
      'py-3'
    ].join(' '),
    mainContainer: [
      'container',
      'mx-auto'
    ].join(' '),
    imageList: [
      'w-50',
      'place-self-center',
      'grid', 
      'grid-cols-4', 
      'gap-x-4',
      'gap-y-6',
    ].join(' '),
    card: [
      'bg-slate-800',
      'rounded-lg',
      'overflow-hidden',
      'text-slate-400',
      'flex',
      'flex-col',
      'justify-between'
    ].join(' '),
    cardImageContainer: [
      'h-full'
    ].join(' '),
    cardImage: [
      'h-full',
      'w-auto'
    ].join(' '),
  }

  console.log(photos)

  return (
    <div className={styles.main}>
      <header className={`${styles.header} ${styles.navbar}`}>
        <Formik
          initialValues={{
            search: ''
          }}
          
          onSubmit={async values => {
            const res = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID yIfgUqwOZytNpHlc9l_OvtdTlOMw7H-1Cy7cWnwCOJM'
              }
            })
            const data = await res.json()
            setPhotos(data.results)
          }}
          
        >
          <Form className={styles.searchForm}>
            <Field placeholder='Buscar' className={`${styles.textField} ${styles.searchBar}`} name='search'/>
          </Form>
        </Formik>
      </header>
      <main className={styles.mainContainer}>
        <section className={styles.imageList}>
          {photos.filter((photo) => photo.urls.regular != null).map((photo) => 
            <article className={styles.card} key={photo.id} onClick={() => open(photo.links.html)}>
              <div className={styles.cardImageContainer}>
                <img className={styles.cardImage} src={photo.urls.regular} alt={photo.alt_description} />
              </div>
              <div>
                <p>{[photo.description, photo.alt_description].join(' ')}</p> 
              </div>
            </article>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
