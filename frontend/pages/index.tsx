import { Card, CardBody, CardHeader } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { Button } from '@heroui/button'
import { useDisclosure } from '@heroui/modal'
import CreateContentModal from '../components/CreateContentModal'
import { useQuery } from '@tanstack/react-query'
import { LoginContext } from '../context/loginContext'
import { useContext, useState, useMemo } from 'react'
import Filters from '../components/Filters'
import ContentSkeleton from '../components/ContentSkeleton'
import axios from 'axios'
import UpdateContentModal from '../components/UpdateContentModal'
import { useForm } from 'react-hook-form'
import { Input } from '@heroui/input'
import Navigation from '../components/Navigation'

type LoginForm = {
  email: string
  password: string
}

const Dashboard = () => {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(LoginContext)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedContentItem, setSelectedContentItem] = useState(null)
  const { isOpen: IsCreateContentOpen, onOpenChange: onCreateContentOpenChange, onOpen: onCreateContentOpen } = useDisclosure()
  const { isOpen: IsUpdateContentOpen, onOpenChange: onUpdateContentOpenChange, onOpen: onUpdateContentOpen } = useDisclosure()

  const { register, handleSubmit } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    const response = await axios.post(`http://localhost:3001/login`, data)
    if (response.data) {
      setIsLoggedIn(true)
      setUser(response.data)
    }
  }


  const { data: listOfContent, isFetched, refetch } = useQuery({
    enabled: isLoggedIn,
    queryKey: ['content'],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3001/content`, {
        headers: {
          'x-userid': user?.id
        }
      })
      return response.data
    }
  })


  const filteredContent = useMemo(() => {
    if (selectedTypes.length === 0) {
      return listOfContent ?? []
    }

    return listOfContent?.filter((content: any) => {
      return selectedTypes.includes(content.type)
    }) ?? []
  }, [listOfContent, selectedTypes])


  return (
    <>
      <Navigation />
      <div className="h-screen flex justify-center items-center">
        {!isLoggedIn ? (
          <Card className="flex flex-col gap-4 w-2/3">
            <CardBody className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-center">Login</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input label="Email" labelPlacement="outside" type="email" {...register("email")} />
                <Input label="Password" labelPlacement="outside" type="password" {...register("password")} />
                <Button type="submit">Login</Button>
              </form>
            </CardBody>
          </Card>
        ) : (

          <div className="flex flex-col  max-w-screen-lg h-screen px-10">
            <div className="flex flex-col  w-full items-end justify-end m-6">
              <Filters setSelectedTypes={setSelectedTypes} />
            </div>
            <div className="flex flex-wrap min-h-[500px] items-start mt-4">
              {!isFetched && (
                <div className="flex flex-wrap items-start">
                  <ContentSkeleton />
                  <ContentSkeleton />
                  <ContentSkeleton />
                </div>
              )}
              {isFetched && filteredContent.map((content: any, index: any) => (
                <button key={index} onClick={() => {
                  setSelectedContentItem(content)
                  onUpdateContentOpen()
                }}>
                  <Card className="max-w-md m-2" >
                    <CardHeader>
                      <h2>Title: {content.title}</h2>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <p>Type: {content.type}</p>
                      <p>Status: {content.status}</p>
                      <p>Deadline: {content.deadline ? new Date(content.deadline).toLocaleDateString() : 'No deadline'}</p>
                      <p>Authors: {content.authors.map((author: any) => author.name).join(', ')}</p>
                    </CardBody>
                  </Card>
                </button>
              ))}
            </div>

            <div className="flex  items-end">
              <Button onPress={onCreateContentOpen}>
                Create content
              </Button>
            </div>
            <CreateContentModal isOpen={IsCreateContentOpen} onOpenChange={onCreateContentOpenChange} refetch={refetch} />
            {selectedContentItem && (
              <UpdateContentModal contentItem={selectedContentItem} isOpen={IsUpdateContentOpen} onOpenChange={() => {
                onUpdateContentOpenChange()
                setSelectedContentItem(null)
              }} refetch={refetch} />
            )}
          </div >
        )}
      </div>
    </>
  )
}

export default Dashboard;
