import React, { useState, useEffect } from "react"
import { Phone, Mail, MessageCircle, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { mockAPI } from "../../data/mockdata"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { CheckCircle2Icon } from "lucide-react"

const BrokerOverview: React.FC = () => {
  const [assistantEnabled, setAssistantEnabled] = useState(true)
  const [workflowExpanded, setWorkflowExpanded] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [alertMessage])

  const broker = mockAPI.broker
  const workflow = mockAPI.workflow

  const handleContact = (method: string) => {
    console.log(`Contact broker via ${method}`)
    setAlertMessage(`Contacting ${broker.name} via ${method}`)
  }

  const formatPending = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <>

      {alertMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert className="shadow-lg flex items-start gap-2">
            <CheckCircle2Icon className="h-5 w-5 text-green-600 mt-1" />
            <div className="flex-1">
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{alertMessage}</AlertDescription>
            </div>
          </Alert>
        </div>
      )}

      <Card className="p-6 space-y-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{broker.name}</h3>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{broker.deals}</div>
              <div className="text-sm text-gray-500">Deals</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{broker.approval_rate}</div>
              <div className="text-sm text-gray-500">Approval Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {formatPending(broker.pending)}
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleContact("Call")}
            className="flex items-center justify-center"
          >
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleContact("Email")}
            className="flex items-center justify-center"
          >
            <Mail className="h-4 w-4 mr-1" />
            Email
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleContact("Chat")}
            className="flex items-center justify-center"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Chat
          </Button>
        </div>
        <div className="mb-4">
          <button
            onClick={() => setWorkflowExpanded(!workflowExpanded)}
            className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-50 rounded-md"
          >
            <h4 className="text-md font-medium text-gray-900">Onboarding Workflow</h4>
            {workflowExpanded ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {workflowExpanded && (
            <div className="mt-3 pl-2">
              <ol className="space-y-3">
                {workflow.steps.map((step: string, index: number) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-6">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-700">E Ardsassist</span>
            <p className="text-xs text-gray-500">AI Assistant</p>
          </div>
          <button
            onClick={() => setAssistantEnabled(!assistantEnabled)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              assistantEnabled ? "bg-blue-600" : "bg-gray-200"
            }`}
            role="switch"
            aria-checked={assistantEnabled}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                assistantEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </Card>
    </>
  )
}

export default BrokerOverview
