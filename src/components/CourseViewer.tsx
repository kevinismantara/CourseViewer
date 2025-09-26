import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, InputGroup, Spinner, Alert } from 'react-bootstrap'
import { useCourseTreeSearch } from '../api/useCourseTreeSearch'
import { CourseTreeViewer, type CourseItem } from '../components/CourseTreeViewer'

interface CourseSearchFormProps {
    onSubmitSearch: (search: string) => void
    isLoading: boolean
}

interface SearchResultsDisplayProps {
    data: CourseItem[] | undefined
    error: Error | null
    isLoading: boolean
    hasSearched: boolean
}
  
export function CourseSearchForm({ onSubmitSearch, isLoading }: CourseSearchFormProps) {
    const [searchInput, setSearchInput] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        if (!searchInput.trim()) {
            setShowAlert(true)
            return
        }
        
        setShowAlert(false)
        onSubmitSearch(searchInput)
    }

    return (
        <Row className="justify-content-center">
        <Col xs={12} md={10} lg={10}>
            <Form onSubmit={handleSubmit}>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Course"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    size="lg"
                    style={{ minWidth: 180 }}
                />
                <Button type="submit" variant="primary" size="lg">
                    {isLoading ? <Spinner size="sm" animation="border" role="status" /> : 'Search'}
                </Button>
            </InputGroup>
            </Form>
            
            {showAlert && (
            <Alert variant="danger" dismissible onClose={() => setShowAlert(false)}>
                Please enter a value
            </Alert>
            )}
        </Col>
        </Row>
    )
}

export function SearchResultsDisplay({ data, error, isLoading, hasSearched }: SearchResultsDisplayProps) {
    return (
        <Row className="mt-4 justify-content-center">
        <Col xs={12} md={10} lg={8}>
            {error ? (
                <Alert variant="danger">{(error as Error).message}</Alert>
            ) : isLoading ? (
            <div className="d-flex align-items-center gap-2">
                <Spinner animation="border" role="status" />
                <span> Loading...</span>
            </div>
            ) : hasSearched && data ? (
                <CourseTreeViewer data={data as CourseItem[]} />
            ) : hasSearched ? (
                <div className="text-muted"> No data to display </div>
            ) : null}
        </Col>
        </Row>
    )
}

export function CourseViewer() {
    const [submittedSearch, setSubmittedSearch] = useState<string | undefined>(undefined)
    const [hasSearched, setHasSearched] = useState(false)

    const { data, isLoading, isFetching, error } = useCourseTreeSearch(submittedSearch)

    function handleSearchSubmit(search: string) {
        setSubmittedSearch(search)
        setHasSearched(true)
    }

    return (
        <Container className="py-4">
        <Row className="justify-content-center mb-4">
            <Col xs={12} md={10} lg={8}>
            <h1 className="text-center">Course Viewer</h1>
            </Col>
        </Row>
        <CourseSearchForm 
            onSubmitSearch={handleSearchSubmit} 
            isLoading={isFetching} 
        />
        <SearchResultsDisplay 
            data={data} 
            error={error} 
            isLoading={isLoading} 
            hasSearched={hasSearched} 
        />
        </Container>
    )
}
