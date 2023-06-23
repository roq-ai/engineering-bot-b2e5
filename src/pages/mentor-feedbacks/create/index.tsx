import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createMentorFeedback } from 'apiSdk/mentor-feedbacks';
import { Error } from 'components/error';
import { mentorFeedbackValidationSchema } from 'validationSchema/mentor-feedbacks';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { RoadmapInterface } from 'interfaces/roadmap';
import { getUsers } from 'apiSdk/users';
import { getRoadmaps } from 'apiSdk/roadmaps';
import { MentorFeedbackInterface } from 'interfaces/mentor-feedback';

function MentorFeedbackCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MentorFeedbackInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMentorFeedback(values);
      resetForm();
      router.push('/mentor-feedbacks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MentorFeedbackInterface>({
    initialValues: {
      feedback: '',
      mentor_id: (router.query.mentor_id as string) ?? null,
      roadmap_id: (router.query.roadmap_id as string) ?? null,
    },
    validationSchema: mentorFeedbackValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Mentor Feedback
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="feedback" mb="4" isInvalid={!!formik.errors?.feedback}>
            <FormLabel>Feedback</FormLabel>
            <Input type="text" name="feedback" value={formik.values?.feedback} onChange={formik.handleChange} />
            {formik.errors.feedback && <FormErrorMessage>{formik.errors?.feedback}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'mentor_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<RoadmapInterface>
            formik={formik}
            name={'roadmap_id'}
            label={'Select Roadmap'}
            placeholder={'Select Roadmap'}
            fetcher={getRoadmaps}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'mentor_feedback',
  operation: AccessOperationEnum.CREATE,
})(MentorFeedbackCreatePage);
