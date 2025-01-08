type ErrorProp = {
  message: string | null;
};

export const MessageError = ({ message}: ErrorProp) => {
  if(message == null || message.trim().length == 0 ){
    return(
      <p className="h-2  mt-2 mb-4"></p>
    )
  }

  return(
    <p className="mt-2  mb-4 ml-1 h-2 text-red-500 text-sm ">{message}</p>
  )
}