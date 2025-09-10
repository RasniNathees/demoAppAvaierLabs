import React, { useState } from "react"
import { AlertTriangle } from "lucide-react"
import { useAppContext } from "../../appcontext"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Accordion } from "../ui/accordion"
import { Button } from "../ui/button"
import { mockAPI } from "../../data/mockdata"

const BorrowerOverView: React.FC = () => {
  const { activeBorrowerId } = useAppContext()
  const [aiExplainabilityOpen, setAiExplainabilityOpen] = useState(false)

  if (!activeBorrowerId) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-[28rem]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-12 w-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">Select a borrower to view details</p>
        </div>
      </Card>
    )
  }

  const borrower = mockAPI.borrowers.details[activeBorrowerId]
  if (!borrower) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-[28rem]">
        <p className="text-gray-500">Borrower details not found</p>
      </Card>
    )
  }

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)

  const handleAction = (action: string) => {
    console.log(`${action} action triggered for borrower ${borrower.id}`)
    alert(`${action} action triggered for ${borrower.name}!`)
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            {borrower.name}
          </h2>
          <div className="text-sm text-gray-500 space-y-0.5">
            <p>{borrower.email}</p>
            <p>{borrower.phone}</p>
            <p className="font-medium text-gray-900">
              {formatAmount(borrower.loan_amount)}
            </p>
          </div>
        </div>
        <Badge variant="review" className="self-start">
          {borrower.status}
        </Badge>
      </div>
      <Accordion
        title={`AI Explainability ${
          borrower.ai_flags.length > 0
            ? `(${borrower.ai_flags.length} issues)`
            : ""
        }`}
        isOpen={aiExplainabilityOpen}
        onToggle={() => setAiExplainabilityOpen(!aiExplainabilityOpen)}
      >
        {borrower.ai_flags.length > 0 ? (
          <div className="space-y-3 mb-4">
            {borrower.ai_flags.map((flag: string, index: number) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-700">{flag}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-4">
            No AI explainability issues found
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction("Request Documents")}
          >
            Request Documents
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction("Send to Valuer")}
          >
            Send to Valuer
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => handleAction("Approve")}
          >
            Approve
          </Button>
        </div>
      </Accordion>
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Loan Summary</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <dt className="text-sm font-medium text-gray-500">Employment</dt>
            <dd className="text-sm text-gray-900">{borrower.employment}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Income</dt>
            <dd className="text-sm text-gray-900">
              {formatAmount(borrower.income)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Existing Loan</dt>
            <dd className="text-sm text-gray-900">
              {formatAmount(borrower.existing_loan)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Credit Score</dt>
            <dd className="text-sm text-gray-900">{borrower.credit_score}</dd>
          </div>
        </dl>

        <div>
          <dt className="text-sm font-medium text-gray-500">Source of Funds</dt>
          <dd className="text-sm text-gray-900">{borrower.source_of_funds}</dd>
        </div>
      </div>

      {borrower.risk_signal && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              Risk Signal
            </span>
          </div>
          <p className="text-sm text-yellow-700">{borrower.risk_signal}</p>
        </div>
      )}

      <div>
        <Button
          variant="destructive"
          size="lg"
          className="w-full"
          onClick={() => handleAction("Escalate to Credit Committee")}
        >
          Escalate to Credit Committee
        </Button>
      </div>
    </Card>
  )
}

export default BorrowerOverView
