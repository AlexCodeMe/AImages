import Image from 'next/image'
import { useToast } from '../ui/use-toast'
import { CldUploadWidget } from 'next-cloudinary'

type MediaUploaderProps = {
    onValueChange: (value: string) => void
    setImage: React.Dispatch<any>
    publicId: string
    image: any
    type: string
}

const MediaUploader = ({
    onValueChange,
    setImage,
    image,
    publicId,
    type
}: MediaUploaderProps) => {
    const { toast } = useToast()

    const onUploadSuccessHandler = (result: any) => {
        toast({
            title: 'Successful image upload',
            description: '1 credit was used from your account',
            duration: 4000,
            className: 'success-toast'
        })
    }
    const onUploadErrorHandler = () => {
        toast({
            title: 'Something went wrong while uploading',
            description: 'Please try again!',
            duration: 4000,
            className: 'error-toast'
        })
    }

  return (
    <CldUploadWidget 
        uploadPreset='aimages'
        options={{
            multiple: false,
            resourceType: 'image', 
        }}        
        onSuccess={onUploadSuccessHandler}
        onError={onUploadErrorHandler}
    >
        {({ open }) => (
            <div className='flex flex-col gap-4'>
                <h3 className='h3-bold text-dark-600'>
                    Original
                </h3>
                {publicId ? (
                    <>
                        HERE IS THE IMAGE
                    </>
                ) : (
                    <div 
                        className='media-uploader_cta'
                        onClick={() => open()}
                    >
                        <div className='media-uploader_cta-image'>
                            <Image
                                src='/assets/icons/add.svg'
                                alt='Add Image'
                                width={24}
                                height={24}
                            />
                        </div>
                        <p className='p-14-medium'>Click to Upload Image</p>
                    </div>
                )}
            </div>
        )}
    </CldUploadWidget>
  )
}

export default MediaUploader